<script setup lang="ts">
import type { Fisch } from '~/data/fische'

defineProps<{ fisch: Fisch }>()
</script>

<template>
  <NuxtLink :to="`/arten/${fisch.slug}`" class="fish-card card">
    <div class="art" :style="{ '--tint': fisch.farbe }">
      <FishIllustration :form="fisch.form" :farbe="fisch.farbe" />
    </div>
    <div class="body">
      <div class="top">
        <h3>{{ fisch.name }}</h3>
        <IucnBadge :status="fisch.iucn" compact />
      </div>
      <p class="sci muted">{{ fisch.wissenschaftlich }}</p>
      <p class="kurz">{{ fisch.kurz }}</p>
      <div class="chips">
        <span v-for="l in fisch.lebensraum" :key="l" class="chip">{{ l }}</span>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped>
.fish-card { display: flex; flex-direction: column; overflow: hidden; color: inherit; transition: transform .18s, box-shadow .18s; }
.fish-card:hover { transform: translateY(-4px); text-decoration: none; border-color: rgba(255,177,98,.35); box-shadow: 0 18px 40px rgba(0,0,0,.45), 0 0 0 1px rgba(255,177,98,.12); }
.fish-card:hover .art :deep(svg) { transform: scale(1.04) translateX(4px); }
.art :deep(svg) { transition: transform .4s ease; }
.art {
  padding: 30px 32px;
  background:
    radial-gradient(70% 80% at 50% 60%, color-mix(in srgb, var(--tint) 30%, transparent), transparent 70%),
    radial-gradient(60% 50% at 80% 10%, rgba(255,177,98,.10), transparent 70%),
    var(--bg-deep);
  border-bottom: 1px solid var(--border);
}
.body { padding: 16px 18px 18px; display: flex; flex-direction: column; flex: 1; }
.top { display: flex; justify-content: space-between; align-items: center; gap: 8px; }
h3 { margin: 0; }
.sci { margin: 2px 0 10px; font-size: .95rem; }
.kurz { font-size: .9rem; color: var(--text-muted); display: -webkit-box; -webkit-line-clamp: 3; line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; flex: 1; }
.chips { display: flex; gap: 6px; flex-wrap: wrap; }
</style>
