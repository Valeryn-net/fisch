<script setup lang="ts">
import { drawOpenWater } from '~/utils/asciiOcean'
const canvas = ref<HTMLCanvasElement>()
useAsciiAnimation(canvas, drawOpenWater, 24)
</script>

<template>
  <div class="ocean-background" aria-hidden="true"><canvas ref="canvas" /></div>
</template>

<style scoped>
.ocean-background {
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  user-select: none;
}
canvas {
  display: block;
  width: 100%;
  height: 100%;
}
@media print {
  .ocean-background {
    display: none;
  }
}
</style>
