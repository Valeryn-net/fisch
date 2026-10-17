<script setup lang="ts">
import type { Species } from '~/data/species'
defineProps<{ fish: Species; number?: number }>()
</script>

<template>
  <NuxtLink :to="`/species/${fish.slug}`" class="fish-card">
    <div class="card-plate">
      <span v-if="number" class="plate-number mono"
        >FIG. {{ String(number).padStart(2, '0') }}</span
      ><img
        :src="fish.plate.file.replace('.webp', '-sm.webp')"
        :alt="`${fish.name} — historical illustration or museum specimen`"
        width="640"
        height="400"
        loading="lazy"
      /><span class="card-arrow" aria-hidden="true">↗</span>
    </div>
    <div class="card-heading">
      <h3>{{ fish.name }}</h3>
      <span class="mono">{{ fish.status }}</span>
    </div>
    <p class="latin">{{ fish.latin }}</p>
    <p class="card-description">{{ fish.lede }}</p>
    <span class="mono card-habitat">{{ fish.habitat.join(' / ') }}</span>
  </NuxtLink>
</template>
