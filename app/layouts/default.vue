<script setup lang="ts">
import { species } from '~/data/species'
const route = useRoute()
const open = ref(false)
const { paused, toggle } = useOceanMotion()
watch(
  () => route.fullPath,
  () => {
    open.value = false
  },
)
const links = [
  { to: '/species', label: 'The collection' },
  { to: '/glossary', label: 'Glossary' },
  { to: '/about', label: 'About & sources' },
]
</script>

<template>
  <div class="site-shell">
    <OceanBackground />
    <a class="skip-link" href="#main">Skip to content</a>
    <header class="masthead container">
      <NuxtLink to="/" class="wordmark" aria-label="Fischwiki home"
        ><span class="brand-mark" aria-hidden="true">f.</span
        ><span
          >FISCHWIKI<small>An independent field guide</small></span
        ></NuxtLink
      >
      <button
        class="menu-toggle"
        aria-controls="main-navigation"
        :aria-expanded="open"
        @click="open = !open"
      >
        {{ open ? 'Close −' : 'Menu +' }}
      </button>
      <nav
        id="main-navigation"
        aria-label="Main navigation"
        :class="{ 'is-open': open }"
      >
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          :aria-current="route.path.startsWith(link.to) ? 'page' : undefined"
          >{{ link.label
          }}<sup v-if="link.to === '/species'">{{
            species.length
          }}</sup></NuxtLink
        >
      </nav>
      <span class="masthead-note mono">Fresh & salt water<br />Est. 2026</span>
    </header>
    <main id="main" tabindex="-1"><slot /></main>
    <footer class="site-footer container">
      <div class="footer-garden"><AsciiNature kind="kelp" /></div>
      <div class="footer-top">
        <NuxtLink to="/" class="footer-name">Fischwiki<span>↗</span></NuxtLink>
        <p>A small collection.<br />A good place to get curious.</p>
      </div>
      <div class="footer-bottom mono">
        <span>Independent · Non-commercial · Vol. 01</span
        ><NuxtLink to="/about#image-credits">Image credits & licences</NuxtLink
        ><a href="#main">Back to the surface ↑</a>
      </div>
    </footer>
    <button
      class="motion-toggle mono"
      :aria-pressed="paused"
      aria-label="Pause or resume all water, kelp and fish animations"
      @click="toggle"
    >
      <span aria-hidden="true">{{ paused ? '▷' : 'Ⅱ' }}</span>
      {{ paused ? 'Resume motion' : 'Pause motion' }}
    </button>
  </div>
</template>
