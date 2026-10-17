<script setup lang="ts">
const host = ref<HTMLElement>()
const { text } = useAsciiAnimation(host, 'background')
</script>

<template>
  <div ref="host" class="ocean-background ascii-frame" aria-hidden="true">
    <pre>{{ text }}</pre>
  </div>
</template>

<style scoped>
.ocean-background {
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  user-select: none;
  color: #5f7655;
  opacity: 0.28;
  mask-image: linear-gradient(
    90deg,
    #000,
    rgba(0, 0, 0, 0.4) 32%,
    rgba(0, 0, 0, 0.4) 68%,
    #000
  );
}
@media print {
  .ocean-background {
    display: none;
  }
}
</style>
