<script setup lang="ts">
import { fische, iucnInfo } from '~/data/fische'

const route = useRoute()
const fisch = computed(() => fische.find(f => f.slug === route.params.slug))

if (!fisch.value) {
  throw createError({ statusCode: 404, statusMessage: 'Art nicht gefunden', fatal: true })
}

const f = fisch.value!
useHead({
  title: f.name,
  meta: [{ name: 'description', content: f.kurz }]
})

const sections = [
  { id: 'merkmale', titel: 'Merkmale', text: f.merkmale },
  { id: 'lebensweise', titel: 'Lebensweise', text: f.lebensweise },
  { id: 'fortpflanzung', titel: 'Fortpflanzung', text: f.fortpflanzung },
  { id: 'gefaehrdung', titel: 'Gefährdung und Schutz', text: f.gefaehrdung }
]

const verwandt = fische
  .filter(x => x.slug !== f.slug)
  .map(x => ({ x, score: (x.familie === f.familie ? 3 : 0) + (x.ordnung === f.ordnung ? 2 : 0) + x.lebensraum.filter(l => f.lebensraum.includes(l)).length }))
  .sort((a, b) => b.score - a.score)
  .slice(0, 3)
  .map(v => v.x)

const steckbrief = [
  ['Maximale Länge', f.maxLaenge],
  ['Maximales Gewicht', f.maxGewicht],
  ['Lebensdauer', f.lebensdauer],
  ['Nahrung', f.nahrung]
]
</script>

<template>
  <article v-if="fisch" class="container page">
    <nav class="crumbs"><NuxtLink to="/">Start</NuxtLink> / <NuxtLink to="/arten">Arten</NuxtLink> / {{ f.name }}</nav>

    <header class="head">
      <h1>{{ f.name }}</h1>
      <p class="sub"><span class="mono">● Artenporträt</span><br><span class="sci">{{ f.wissenschaftlich }}</span> <span class="muted">{{ f.autor }}</span></p>
    </header>

    <div class="layout">
      <div class="content">
        <p class="lead">{{ f.kurz }}</p>

        <nav class="toc card" aria-label="Inhalt">
          <strong>Inhalt</strong>
          <ol>
            <li v-for="s in sections" :key="s.id"><a :href="`#${s.id}`">{{ s.titel }}</a></li>
            <li><a href="#fakten">Wissenswertes</a></li>
          </ol>
        </nav>

        <section v-for="s in sections" :id="s.id" :key="s.id" class="sec">
          <h2>{{ s.titel }}</h2>
          <p>{{ s.text }}</p>
        </section>

        <section id="fakten" class="sec">
          <h2>Wissenswertes</h2>
          <ul class="facts">
            <li v-for="(t, i) in f.fakten" :key="i">{{ t }}</li>
          </ul>
        </section>

        <section class="sec">
          <h2>Verwandte Artikel</h2>
          <div class="grid">
            <FishCard v-for="v in verwandt" :key="v.slug" :fisch="v" />
          </div>
        </section>
      </div>

      <aside class="infobox card">
        <div class="ib-title">{{ f.name }}</div>
        <div class="ib-art"><FishIllustration :form="f.form" :farbe="f.farbe" /></div>
        <p class="ib-note">Schematische Darstellung</p>

        <div class="ib-head">Systematik</div>
        <dl>
          <dt>Klasse</dt><dd>{{ f.klasse }}</dd>
          <dt>Ordnung</dt><dd>{{ f.ordnung }}</dd>
          <dt>Familie</dt><dd>{{ f.familie }}</dd>
          <dt>Art</dt><dd><span class="sci">{{ f.wissenschaftlich }}</span></dd>
        </dl>

        <div class="ib-head">Steckbrief</div>
        <dl>
          <template v-for="[k, v] in steckbrief" :key="k">
            <dt>{{ k }}</dt><dd>{{ v }}</dd>
          </template>
          <dt>Lebensraum</dt><dd>{{ f.lebensraum.join(', ') }}</dd>
          <template v-if="f.wanderverhalten">
            <dt>Wanderverhalten</dt><dd>{{ f.wanderverhalten }}</dd>
          </template>
          <dt>Verbreitung</dt><dd>{{ f.verbreitung }}</dd>
          <template v-if="f.weitereNamen?.length">
            <dt>Weitere Namen</dt><dd>{{ f.weitereNamen.join(', ') }}</dd>
          </template>
        </dl>

        <div class="ib-head">Gefährdungsstatus (IUCN)</div>
        <div class="ib-status">
          <IucnScale :status="f.iucn" />
          <p><strong>{{ iucnInfo[f.iucn].label }}</strong></p>
        </div>
      </aside>
    </div>
  </article>
</template>

<style scoped>
.page { padding-top: 28px; }
.head { border-bottom: 1px solid var(--border); padding-bottom: 14px; margin-bottom: 24px; }
.head h1 { margin-bottom: 6px; font-weight: 400; }
.sub .mono { font-size: .68rem; color: var(--accent-2); }
.sub { margin: 0; font-size: 1.1rem; }
.layout { display: grid; gap: 32px; grid-template-columns: 1fr; }
@media (min-width: 980px) { .layout { grid-template-columns: 1fr 340px; } .infobox { position: sticky; top: 84px; align-self: start; } }
@media (max-width: 979px) { .infobox { order: -1; } }
.content { min-width: 0; max-width: 72ch; }
.lead { font-size: 1.3rem; font-family: var(--serif); font-weight: 300; line-height: 1.5; color: var(--cream); }
.toc { display: inline-block; padding: 14px 24px 10px; margin: 8px 0 12px; box-shadow: none; }
.toc a { color: var(--oat); }
.toc strong { font-size: .85rem; }
.toc ol { margin: 6px 0 0; padding-left: 20px; font-size: .92rem; }
.sec { padding-top: 22px; scroll-margin-top: 80px; }
.sec h2 { border-bottom: 1px solid var(--border); padding-bottom: 6px; }
.facts { padding: 0; list-style: none; display: grid; gap: 10px; }
.facts li { padding: 14px 18px 14px 48px; position: relative; background: var(--surface); border: 1px solid var(--border); border-radius: 14px; }
.facts li::before { content: 'i'; position: absolute; left: 14px; top: 13px; width: 20px; height: 20px; border-radius: 50%; background: var(--accent-soft); color: var(--accent); font: italic 700 .8rem var(--serif); display: grid; place-items: center; }

.infobox { overflow: hidden; font-size: .9rem; }
.ib-title { color: var(--cream); text-align: center; font: italic 500 1.3rem var(--serif); padding: 16px 12px 4px; }
.ib-art { margin: 10px 14px 0; border-radius: 12px; padding: 26px 26px 10px; background: radial-gradient(70% 70% at 50% 60%, rgba(255,177,98,.16), transparent 70%), var(--bg-deep); }
.ib-note { text-align: center; font: 500 .62rem var(--mono); letter-spacing: .1em; text-transform: uppercase; color: var(--text-muted); margin: 0; padding: 8px 0 12px; }
.ib-head { color: var(--accent); font: 500 .68rem var(--mono); letter-spacing: .12em; text-transform: uppercase; padding: 14px 16px 4px; border-top: 1px solid var(--border); }
dl { display: grid; grid-template-columns: 112px 1fr; margin: 0; padding: 10px 16px; gap: 7px 12px; }
dt { color: var(--text-muted); font-weight: 500; }
dd { margin: 0; }
.ib-status { padding: 14px 16px 6px; }
.ib-status p { text-align: center; margin: 8px 0; }
</style>
