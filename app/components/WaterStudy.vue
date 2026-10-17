<script setup lang="ts">
const host = ref<HTMLElement>()
const { text } = useAsciiAnimation(host, 'study')
const { paused, toggle } = useOceanMotion()
</script>

<template>
  <section class="water-study">
    <div class="study-copy">
      <span class="mono">Interlude / 001</span>
      <h2>Stay a<br /><em>little longer.</em></h2>
      <p>There’s a whole world<br />just under the surface.</p>
      <NuxtLink to="/species?habitat=Marine" class="text-link"
        >Explore the sea <span>↗</span></NuxtLink
      >
    </div>
    <div class="study-field">
      <div ref="host" class="study-scene ascii-frame" aria-hidden="true">
        <pre>{{ text }}</pre>
      </div>
      <div class="study-controls mono">
        <span>A little life below the surface</span>
        <button :aria-pressed="paused" @click="toggle">
          {{ paused ? 'Play motion ▷' : 'Pause motion Ⅱ' }}
        </button>
      </div>
    </div>
  </section>
</template>
