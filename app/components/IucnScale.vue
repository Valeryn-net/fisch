<script setup lang="ts">
import { statusInfo, statusScale, type Status } from '~/data/species'
defineProps<{ status: Status }>()
</script>
<template>
  <div
    class="status-scale"
    role="img"
    :aria-label="`IUCN global assessment: ${statusInfo[status]}`"
  >
    <span
      v-for="step in statusScale"
      :key="step"
      :class="{ selected: step === status }"
      >{{ step }}</span
    >
  </div>
</template>
