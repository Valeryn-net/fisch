<script setup lang="ts">
import { glossar, iucnInfo, iucnSkala } from '~/data/fische'

useHead({ title: 'Glossar' })

const filter = ref('')
const gruppen = computed(() => {
  const n = filter.value.toLowerCase()
  const map = new Map<string, typeof glossar>()
  for (const e of glossar.filter(e => !n || e.begriff.toLowerCase().includes(n) || e.text.toLowerCase().includes(n))) {
    const b = e.begriff[0]!.toUpperCase()
    map.set(b, [...(map.get(b) ?? []), e])
  }
  return [...map.entries()].sort(([a], [b]) => a.localeCompare(b, 'de'))
})
</script>

<template>
  <div class="container page">
    <nav class="crumbs"><NuxtLink to="/">Start</NuxtLink> / Glossar</nav>
    <h1><em>Glossar</em></h1>
    <p class="muted intro">Fachbegriffe aus Ichthyologie und Artenschutz, kurz erklärt.</p>

    <input v-model="filter" class="input search" type="search" placeholder="Begriff filtern …">

    <div class="layout">
      <div>
        <section v-for="[buchstabe, eintraege] in gruppen" :key="buchstabe" class="group">
          <div class="letter">{{ buchstabe }}</div>
          <dl>
            <div v-for="e in eintraege" :key="e.begriff" class="entry">
              <dt>{{ e.begriff }}</dt>
              <dd>{{ e.text }}</dd>
            </div>
          </dl>
        </section>
        <p v-if="!gruppen.length" class="muted">Kein Begriff gefunden.</p>
      </div>

      <aside class="card iucn">
        <h3>IUCN-Kategorien</h3>
        <p class="muted small">Die Rote Liste der International Union for Conservation of Nature bewertet das Aussterberisiko von Arten weltweit.</p>
        <ul>
          <li v-for="s in [...iucnSkala, 'DD', 'NE'] as const" :key="s">
            <IucnBadge :status="s" />
          </li>
        </ul>
        <p class="muted small">Als „bedroht“ (threatened) gelten die Kategorien VU, EN und CR.</p>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.page { padding-top: 28px; }
.intro { margin-bottom: 20px; }
.search { max-width: 420px; margin-bottom: 28px; }
.layout { display: grid; gap: 32px; grid-template-columns: 1fr; }
@media (min-width: 960px) { .layout { grid-template-columns: 1fr 300px; } .iucn { position: sticky; top: 84px; align-self: start; } }
.group { display: grid; grid-template-columns: 48px 1fr; gap: 16px; padding: 16px 0; border-top: 1px solid var(--border); }
.letter { font: italic 400 2.2rem var(--serif); color: var(--accent); line-height: 1; }
dl { margin: 0; display: grid; gap: 14px; }
dt { font-weight: 600; }
dd { margin: 2px 0 0; color: var(--text-muted); }
.iucn { padding: 20px; box-shadow: none; }
.iucn ul { list-style: none; padding: 0; margin: 12px 0; display: grid; gap: 8px; }
.small { font-size: .85rem; }
</style>
