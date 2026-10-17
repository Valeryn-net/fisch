<script setup lang="ts">
import { iucnInfo, type Iucn } from '~/data/fische'

const props = defineProps<{ status: Iucn, compact?: boolean }>()
const info = computed(() => iucnInfo[props.status])
</script>

<template>
  <span class="badge" :title="`IUCN: ${info.label}`">
    <span class="code" :style="{ background: info.farbe }">{{ info.kurz }}</span>
    <span v-if="!compact" class="label">{{ info.label }}</span>
  </span>
</template>

<style scoped>
.badge { display: inline-flex; align-items: center; gap: .45em; font-size: .8rem; font-weight: 500; }
.code {
  display: inline-grid; place-items: center;
  min-width: 2.1em; height: 1.75em; padding: 0 .4em;
  border-radius: 6px; color: #fff; font-weight: 700; font-size: .72rem; letter-spacing: .04em;
}
.label { color: var(--text); }
</style>
