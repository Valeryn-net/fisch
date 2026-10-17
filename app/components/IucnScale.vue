<script setup lang="ts">
import { iucnInfo, iucnSkala, type Iucn } from '~/data/fische'

defineProps<{ status: Iucn }>()
</script>

<template>
  <div class="scale" role="img" :aria-label="`IUCN-Status: ${iucnInfo[status].label}`">
    <div class="steps">
      <span
        v-for="s in iucnSkala" :key="s" class="step"
        :class="{ active: s === status }"
        :style="s === status ? { background: iucnInfo[s].farbe, borderColor: iucnInfo[s].farbe } : {}"
      >{{ s }}</span>
    </div>
    <div class="caption">
      <span>Nicht gefährdet</span><span>Ausgestorben</span>
    </div>
  </div>
</template>

<style scoped>
.steps { display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; }
.step {
  text-align: center; font-size: .7rem; font-weight: 700; padding: .35em 0;
  border-radius: 6px; border: 1px solid var(--border); color: var(--text-muted); background: var(--surface);
}
.step.active { color: #fff; transform: scale(1.08); box-shadow: 0 2px 6px rgba(0,0,0,.2); }
.caption { display: flex; justify-content: space-between; font-size: .68rem; color: var(--text-muted); margin-top: 4px; }
</style>
