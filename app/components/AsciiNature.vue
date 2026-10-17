<script setup lang="ts">
const props = defineProps<{ kind: 'water' | 'kelp' }>()
const host = ref<HTMLElement>()
const { text } = useAsciiAnimation(host, props.kind)
</script>

<template>
  <div
    ref="host"
    class="ascii-nature ascii-frame"
    :class="`ascii-${kind}`"
    aria-hidden="true"
  >
    <pre>{{ text }}</pre>
  </div>
</template>

<style scoped>
.ascii-nature {
  pointer-events: none;
  user-select: none;
}
.ascii-water {
  position: absolute;
  width: 850px;
  height: 300px;
  color: var(--green);
  opacity: 0.42;
  mask-image: radial-gradient(ellipse at center, #000 20%, transparent 72%);
}
.ascii-kelp {
  position: relative;
  height: 406px;
  color: #607450;
}
@media (max-width: 760px) {
  .ascii-kelp {
    height: 392px;
  }
}
</style>
