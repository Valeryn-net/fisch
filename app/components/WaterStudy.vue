<script setup lang="ts">
const canvas = ref<HTMLCanvasElement>()
const paused = ref(false)
let frame = 0
let observer: ResizeObserver | undefined
let visibilityObserver: IntersectionObserver | undefined
let motionQuery: MediaQueryList | undefined
let visible = true
let width = 0
let height = 0
let time = 0
let last = 0
let pointer = { x: -1000, y: -1000 }

function draw() {
  const ctx = canvas.value?.getContext('2d')
  if (!ctx) return
  ctx.clearRect(0, 0, width, height)
  ctx.font = '12px monospace'
  const chars = '·:~≈+*'
  for (let y = 12; y < height; y += 16) {
    for (let x = 8; x < width; x += 10) {
      const distance = Math.hypot(x - pointer.x, y - pointer.y)
      const ripple =
        Math.exp(-distance / 110) * Math.sin(distance / 16 - time * 3)
      const wave =
        Math.sin(x * 0.013 + time * 0.5) * Math.cos(y * 0.026 - time * 0.35) +
        Math.sin((x + y) * 0.018 + time * 0.4) * 0.5 +
        ripple
      // Elliptical shoals, built from characters rather than image textures.
      const cx = ((time * 13 + width * 0.55) % (width + 360)) - 100
      const cy = height * 0.49 + Math.sin(time * 0.3) * 25
      const fish = ((x - cx) / 125) ** 2 + ((y - cy) / 34) ** 2 < 1
      const tail =
        x > cx + 100 && x < cx + 155 && Math.abs(y - cy) < (x - cx - 98) * 0.7
      ctx.fillStyle =
        fish || tail
          ? `rgba(221,225,164,${0.55 + wave * 0.12})`
          : `rgba(188,205,172,${0.08 + (wave + 1.5) * 0.11})`
      ctx.fillText(
        fish
          ? Math.sin(x * 0.15 + y * 0.2) > 0.2
            ? ':'
            : '+'
          : chars[Math.max(0, Math.min(5, Math.floor((wave + 1.5) * 1.6)))]!,
        x,
        y + Math.sin(x * 0.02 + time) * 2,
      )
    }
  }
}
function loop(now: number) {
  frame = 0
  if (paused.value || !visible) return
  if (now - last > 65) {
    time += Math.min((now - last) / 1000, 0.1)
    last = now
    draw()
  }
  frame = requestAnimationFrame(loop)
}
function sync() {
  cancelAnimationFrame(frame)
  frame = 0
  if (!paused.value && visible) {
    last = performance.now()
    frame = requestAnimationFrame(loop)
  } else draw()
}
function move(event: PointerEvent) {
  const rect = canvas.value!.getBoundingClientRect()
  pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top }
  if (paused.value) draw()
}
function motionChanged() {
  paused.value = motionQuery?.matches ?? false
}
watch(paused, sync)
onMounted(() => {
  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  motionChanged()
  motionQuery.addEventListener('change', motionChanged)
  observer = new ResizeObserver(([entry]) => {
    if (!entry || !canvas.value) return
    width = entry.contentRect.width
    height = entry.contentRect.height
    const ratio = Math.min(window.devicePixelRatio || 1, 2)
    canvas.value.width = width * ratio
    canvas.value.height = height * ratio
    canvas.value.getContext('2d')?.setTransform(ratio, 0, 0, ratio, 0, 0)
    draw()
  })
  observer.observe(canvas.value!)
  visibilityObserver = new IntersectionObserver(([entry]) => {
    visible = entry?.isIntersecting ?? false
    sync()
  })
  visibilityObserver.observe(canvas.value!)
  sync()
})
onBeforeUnmount(() => {
  cancelAnimationFrame(frame)
  observer?.disconnect()
  visibilityObserver?.disconnect()
  motionQuery?.removeEventListener('change', motionChanged)
})
</script>

<template>
  <section class="water-study">
    <div class="study-copy">
      <span class="mono">Interlude / 001</span>
      <h2>Stay a<br /><em>little longer.</em></h2>
      <p>There’s a whole world<br />just under the surface.</p>
      <NuxtLink to="/species?habitat=Marine" class="text-link"
        >Explore the sea <span>↗</span></NuxtLink
      >
    </div>
    <div class="study-field">
      <canvas
        ref="canvas"
        aria-hidden="true"
        @pointermove="move"
        @pointerleave="pointer = { x: -1000, y: -1000 }"
      />
      <div class="study-controls mono">
        <span>Water study — characters in motion</span
        ><button :aria-pressed="paused" @click="paused = !paused">
          {{ paused ? 'Play motion ▷' : 'Pause motion Ⅱ' }}
        </button>
      </div>
    </div>
  </section>
</template>
