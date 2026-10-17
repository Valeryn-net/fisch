import type { Ref } from 'vue'
import { renderOcean, type OceanKind } from '~/utils/asciiOcean'

export function useAsciiAnimation(
  host: Ref<HTMLElement | undefined>,
  kind: OceanKind,
) {
  const { paused } = useOceanMotion()
  const text = ref(
    renderOcean(kind, {
      columns: kind === 'background' ? 120 : kind === 'kelp' ? 120 : 90,
      rows: kind === 'background' ? 60 : 27,
      tick: 0,
      scroll: 0,
      current: 0,
      pointer: { x: -1000, y: -1000, strength: 0 },
    }),
  )
  let frame = 0
  let last = 0
  let elapsed = 0
  let tick = 0
  let columns = 0
  let rows = 0
  let cellWidth = 7.2
  let cellHeight = 14
  let visible = false
  let scroll = 0
  let targetScroll = 0
  let current = 0
  let previousY = 0
  let resize: ResizeObserver | undefined
  let intersection: IntersectionObserver | undefined
  const pointer = { x: -1000, y: -1000, strength: 0 }

  function draw() {
    if (!columns || !rows) return
    text.value = renderOcean(kind, {
      columns,
      rows,
      tick,
      scroll,
      current,
      pointer,
    })
  }
  function loop(now: number) {
    // Eight whole ASCII frames per second, with no interpolated glyph positions.
    if (now - last >= 1000 / 8) {
      elapsed += Math.min((now - last) / 1000, 0.25)
      tick = Math.floor(elapsed * 8)
      last = now
      scroll += (targetScroll - scroll) * 0.45
      current *= 0.65
      pointer.strength *= 0.88
      draw()
    }
    frame = requestAnimationFrame(loop)
  }
  function sync() {
    cancelAnimationFrame(frame)
    frame = 0
    if (!paused.value && visible && !document.hidden) {
      targetScroll = window.scrollY
      last = performance.now()
      frame = requestAnimationFrame(loop)
    }
  }
  function measure() {
    const element = host.value
    const pre = element?.querySelector('pre')
    if (!element || !pre) return
    const style = getComputedStyle(pre)
    const context = document.createElement('canvas').getContext('2d')
    if (context) {
      context.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`
      cellWidth = context.measureText('M').width || 7.2
    }
    cellHeight = parseFloat(style.lineHeight) || 14
    columns = Math.max(1, Math.floor(element.clientWidth / cellWidth))
    rows = Math.max(1, Math.floor(element.clientHeight / cellHeight))
    draw()
  }
  function move(event: PointerEvent) {
    if (
      !visible ||
      paused.value ||
      event.pointerType === 'touch' ||
      !host.value
    )
      return
    const bounds = host.value.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / cellWidth
    const y = (event.clientY - bounds.top) / cellHeight
    if (x < 0 || x >= columns || y < 0 || y >= rows) return
    pointer.x = x
    pointer.y = y
    pointer.strength = 1
  }
  function onScroll() {
    const y = window.scrollY
    if (!paused.value) {
      targetScroll = y
      current = Math.max(-8, Math.min(8, current + (y - previousY) * 0.02))
    }
    previousY = y
  }
  watch(paused, sync)
  onMounted(() => {
    if (!host.value) return
    previousY = window.scrollY
    resize = new ResizeObserver(measure)
    resize.observe(host.value)
    intersection = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? false
        sync()
      },
      { rootMargin: '80px' },
    )
    intersection.observe(host.value)
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('visibilitychange', sync)
    document.fonts.ready.then(() => {
      if (host.value) measure()
    })
  })
  onBeforeUnmount(() => {
    cancelAnimationFrame(frame)
    resize?.disconnect()
    intersection?.disconnect()
    window.removeEventListener('pointermove', move)
    window.removeEventListener('scroll', onScroll)
    document.removeEventListener('visibilitychange', sync)
  })
  return { text }
}
