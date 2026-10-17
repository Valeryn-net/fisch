<script setup lang="ts">
import { statusInfo, type Status } from '~/data/species'
defineProps<{ status: Status; compact?: boolean }>()
</script>
<template>
  <span
    class="status-badge"
    :class="`status-${status}`"
    :title="`IUCN: ${statusInfo[status]}`"
    ><span>{{ status }}</span
    ><span v-if="!compact">{{ statusInfo[status] }}</span></span
  >
</template>
