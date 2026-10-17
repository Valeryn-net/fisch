<script setup lang="ts">
import type { NuxtError } from '#app'
defineProps<{ error: NuxtError }>()
</script>
<template>
  <NuxtLayout
    ><div class="container error-page">
      <span class="mono eyebrow"
        >{{ error.statusCode }} / Uncharted waters</span
      >
      <h1>
        {{
          error.statusCode === 404
            ? 'Nothing swimming here.'
            : 'A little turbulence.'
        }}
      </h1>
      <p>
        {{
          error.statusCode === 404
            ? 'That page or species is not in the collection.'
            : 'The page could not be loaded. Please try again.'
        }}
      </p>
      <button class="text-link" @click="clearError({ redirect: '/species' })">
        Return to the collection ↗
      </button>
    </div></NuxtLayout
  >
</template>
