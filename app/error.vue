<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{ error: NuxtError }>()
</script>

<template>
  <NuxtLayout>
    <div class="container err">
      <p class="eyebrow">Fehler {{ error.statusCode }}</p>
      <h1>{{ error.statusCode === 404 ? 'Diese Seite ist abgetaucht.' : 'Etwas ist schiefgelaufen.' }}</h1>
      <p class="muted">{{ error.statusCode === 404 ? 'Die gesuchte Seite oder Art existiert (noch) nicht.' : error.statusMessage }}</p>
      <button class="btn" @click="clearError({ redirect: '/arten' })">Zu allen Arten</button>
    </div>
  </NuxtLayout>
</template>

<style scoped>
.err { padding: 96px 16px; text-align: center; }
</style>
