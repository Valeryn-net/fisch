<script setup lang="ts">
import { drawAsciiFish, drawBubbles, drawWater } from '~/utils/asciiOcean'
const canvas = ref<HTMLCanvasElement>()
const { paused, toggle } = useOceanMotion()
useAsciiAnimation(canvas, (frame) => {
  const { ctx, width, height, time } = frame
  drawWater(frame, true)
  ctx.fillStyle = '#dce5ae'
  const x = ((time * 30 + width * 0.55 + 160) % (width + 320)) - 160
  drawAsciiFish(
    ctx,
    x,
    height * 0.47 + Math.sin(time * 0.55) * 24,
    width < 450 ? 0.95 : 1.45,
    1,
    time,
    0.86,
  )
  for (let i = 0; i < 3; i++) {
    const smallX =
      width - (((time * 22 + i * 75 + width * 0.3) % (width + 200)) - 100)
    drawAsciiFish(
      ctx,
      smallX,
      height * 0.75 + Math.sin(time * 0.65 + i) * 13 - i * 16,
      0.24 + i * 0.06,
      -1,
      time + i * 2,
      0.6,
    )
  }
  drawBubbles(frame, 16, 0.4)
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
      <canvas ref="canvas" aria-hidden="true" />
      <div class="study-controls mono">
        <span>Water study — characters in motion</span>
        <button :aria-pressed="paused" @click="toggle">
          {{ paused ? 'Play motion ▷' : 'Pause motion Ⅱ' }}
        </button>
      </div>
    </div>
  </section>
</template>
