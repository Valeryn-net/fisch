import type { Ref } from 'vue'

export interface OceanFrame {
  ctx: CanvasRenderingContext2D
  width: number
  height: number
  time: number
  pointer: { x: number; y: number; strength: number }
}

export function useAsciiAnimation(
  canvas: Ref<HTMLCanvasElement | undefined>,
  paint: (frame: OceanFrame) => void,
  fps = 30,
) {
  const { paused } = useOceanMotion()
  const ready = ref(false)
  let context: CanvasRenderingContext2D | null = null
  let frame = 0
  let time = 0
  let last = 0
  let width = 0
  let height = 0
  let visible = false
  let resize: ResizeObserver | undefined
  let intersection: IntersectionObserver | undefined
  const pointer = { x: -1000, y: -1000, strength: 0 }
  let target = { x: -1000, y: -1000 }

  function draw() {
    if (!context || !width || !height) return
    context.clearRect(0, 0, width, height)
    context.save()
    context.textBaseline = 'middle'
    paint({ ctx: context, width, height, time, pointer })
    context.restore()
    ready.value = true
  }
  function loop(now: number) {
    if (now - last >= 1000 / fps) {
      time += Math.min((now - last) / 1000, 0.08)
      last = now
      pointer.x += (target.x - pointer.x) * 0.16
      pointer.y += (target.y - pointer.y) * 0.16
      pointer.strength *= 0.965
      draw()
    }
    frame = requestAnimationFrame(loop)
  }
  function sync() {
    cancelAnimationFrame(frame)
    frame = 0
    if (!context) return
    if (!paused.value && visible && !document.hidden) {
      last = performance.now()
      frame = requestAnimationFrame(loop)
    } else draw()
  }
  function move(event: PointerEvent) {
    if (
      !visible ||
      paused.value ||
      event.pointerType === 'touch' ||
      !canvas.value
    )
      return
    const bounds = canvas.value.getBoundingClientRect()
    const x = event.clientX - bounds.left
    const y = event.clientY - bounds.top
    if (x < -80 || x > width + 80 || y < -80 || y > height + 80) return
    const distance = Math.hypot(x - target.x, y - target.y)
    if (target.x < 0) {
      pointer.x = x
      pointer.y = y
    }
    target = { x, y }
    pointer.strength = Math.min(1, pointer.strength + distance / 120)
  }
  watch(paused, sync)
  onMounted(() => {
    if (!canvas.value) return
    context = canvas.value.getContext('2d')
    if (!context) return
    resize = new ResizeObserver(([entry]) => {
      if (!entry || !canvas.value || !context) return
      width = entry.contentRect.width
      height = entry.contentRect.height
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.value.width = Math.round(width * ratio)
      canvas.value.height = Math.round(height * ratio)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      draw()
    })
    resize.observe(canvas.value)
    intersection = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? false
        sync()
      },
      { rootMargin: '80px' },
    )
    intersection.observe(canvas.value)
    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('visibilitychange', sync)
    // The first frame uses system fonts; repaint once the page's mono font arrives.
    document.fonts.ready.then(() => {
      if (context) draw()
    })
  })
  onBeforeUnmount(() => {
    cancelAnimationFrame(frame)
    resize?.disconnect()
    intersection?.disconnect()
    window.removeEventListener('pointermove', move)
    document.removeEventListener('visibilitychange', sync)
    context = null
  })
  return { ready }
}
