<script setup lang="ts">
import { glossary, statusInfo, statusScale } from '~/data/species'
useHead({ title: 'Glossary' })
const query = ref('')
const groups = computed(() => {
  const filtered = glossary.filter((e) =>
    `${e.term} ${e.text}`
      .toLowerCase()
      .includes(query.value.trim().toLowerCase()),
  )
  const map = new Map<string, typeof glossary>()
  for (const entry of filtered) {
    const initial = entry.term.charAt(0).toUpperCase()
    map.set(initial, [...(map.get(initial) ?? []), entry])
  }
  return [...map.entries()].sort(([a], [b]) => a.localeCompare(b, 'en'))
})
</script>
<template>
  <div class="container page">
    <div class="section-kicker mono">
      <NuxtLink to="/">Fischwiki /</NuxtLink><span>Words from the water</span>
    </div>
    <header class="page-title">
      <h1>The <em>glossary.</em></h1>
      <p>
        From adipose fins to swim bladders.<br />A few useful words for a closer
        look.
      </p>
    </header>
    <div class="glossary-layout">
      <div>
        <label for="glossary-search" class="mono eyebrow">Find a term</label
        ><input
          id="glossary-search"
          v-model="query"
          class="glossary-search"
          type="search"
          placeholder="Type a word or definition…"
        />
        <section
          v-for="[letter, entries] in groups"
          :key="letter"
          class="glossary-group"
        >
          <h2>{{ letter }}</h2>
          <dl>
            <div v-for="entry in entries" :key="entry.term">
              <dt>{{ entry.term }}</dt>
              <dd>{{ entry.text }}</dd>
            </div>
          </dl>
        </section>
        <p v-if="!groups.length" role="status" class="empty-state">
          No matching terms. Try another word.
        </p>
      </div>
      <aside class="glossary-aside">
        <span class="mono eyebrow">Reading the Red List</span>
        <h2>Extinction risk,<br /><em>explained.</em></h2>
        <p>
          The IUCN Red List assesses species globally. The categories VU, EN and
          CR are collectively called “threatened”.
        </p>
        <dl class="status-definitions">
          <div v-for="code in statusScale" :key="code">
            <dt>{{ code }}</dt>
            <dd>{{ statusInfo[code] }}</dd>
          </div>
          <div>
            <dt>DD</dt>
            <dd>Data Deficient</dd>
          </div>
          <div>
            <dt>NE</dt>
            <dd>Not Evaluated</dd>
          </div>
        </dl>
        <p class="fine-print">
          A global category does not describe every local population. “Least
          Concern” does not mean that a species faces no pressures.
        </p>
        <a
          href="https://www.iucnredlist.org/resources/categories-and-criteria"
          target="_blank"
          rel="noopener"
          class="text-link"
          >IUCN categories & criteria ↗</a
        >
      </aside>
    </div>
  </div>
</template>
