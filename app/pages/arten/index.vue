<script setup lang="ts">
import { fische, iucnInfo, iucnSkala, type Lebensraum } from '~/data/fische'

useHead({ title: 'Alle Arten' })

const route = useRoute()
const router = useRouter()

const q = ref(String(route.query.q ?? ''))
const lebensraum = ref<string>(String(route.query.lebensraum ?? ''))
const status = ref<string>(String(route.query.status ?? ''))
const klasse = ref<string>('')
const sort = ref<'name' | 'status'>('name')

watch([q, lebensraum, status], () => {
  const query: Record<string, string> = {}
  if (q.value) query.q = q.value
  if (lebensraum.value) query.lebensraum = lebensraum.value
  if (status.value) query.status = status.value
  router.replace({ query })
})

const klassen = [...new Set(fische.map(f => f.klasse))]
const raeume: Lebensraum[] = ['Süßwasser', 'Brackwasser', 'Salzwasser']

const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')

const ergebnis = computed(() => {
  const n = norm(q.value.trim())
  return fische
    .filter(f => !n || [f.name, f.wissenschaftlich, f.familie, ...(f.weitereNamen ?? [])].some(t => norm(t).includes(n)))
    .filter(f => !lebensraum.value || f.lebensraum.includes(lebensraum.value as Lebensraum))
    .filter(f => !status.value || f.iucn === status.value)
    .filter(f => !klasse.value || f.klasse === klasse.value)
    .sort((a, b) => sort.value === 'name'
      ? a.name.localeCompare(b.name, 'de')
      : iucnSkala.indexOf(b.iucn) - iucnSkala.indexOf(a.iucn))
})

function reset() { q.value = ''; lebensraum.value = ''; status.value = ''; klasse.value = '' }
</script>

<template>
  <div class="container page">
    <header class="page-head">
      <nav class="crumbs"><NuxtLink to="/">Start</NuxtLink> / Arten</nav>
      <h1>Alle <em>Arten</em></h1>
      <p class="muted">Durchsuche und filtere alle Artenporträts nach Lebensraum, Klasse und Gefährdungsstatus.</p>
    </header>

    <div class="layout">
      <aside class="filters card">
        <label class="lbl" for="q">Suche</label>
        <input id="q" v-model="q" class="input" type="search" placeholder="Name, Gattung, Familie …">

        <span class="lbl">Lebensraum</span>
        <div class="pills">
          <button :class="{ on: !lebensraum }" @click="lebensraum = ''">Alle</button>
          <button v-for="r in raeume" :key="r" :class="{ on: lebensraum === r }" @click="lebensraum = r">{{ r }}</button>
        </div>

        <label class="lbl" for="klasse">Klasse</label>
        <select id="klasse" v-model="klasse" class="input">
          <option value="">Alle Klassen</option>
          <option v-for="k in klassen" :key="k" :value="k">{{ k }}</option>
        </select>

        <label class="lbl" for="status">IUCN-Status</label>
        <select id="status" v-model="status" class="input">
          <option value="">Alle Kategorien</option>
          <option v-for="s in iucnSkala.slice(0, 5)" :key="s" :value="s">{{ s }} – {{ iucnInfo[s].label }}</option>
        </select>

        <button class="reset" @click="reset">Filter zurücksetzen</button>
      </aside>

      <section>
        <div class="toolbar">
          <span class="muted">{{ ergebnis.length }} {{ ergebnis.length === 1 ? 'Art' : 'Arten' }}</span>
          <label class="sort">Sortieren:
            <select v-model="sort" class="input">
              <option value="name">Name (A–Z)</option>
              <option value="status">Gefährdung (hoch → niedrig)</option>
            </select>
          </label>
        </div>
        <div v-if="ergebnis.length" class="grid">
          <FishCard v-for="f in ergebnis" :key="f.slug" :fisch="f" />
        </div>
        <div v-else class="empty card">
          <h3>Keine Treffer</h3>
          <p class="muted">Für diese Kombination gibt es noch keinen Artikel.</p>
          <button class="btn" @click="reset">Filter zurücksetzen</button>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.page { padding-top: 32px; }
.page-head { margin-bottom: 28px; }
.layout { display: grid; gap: 28px; grid-template-columns: 1fr; }
@media (min-width: 960px) { .layout { grid-template-columns: 260px 1fr; } .filters { position: sticky; top: 84px; align-self: start; } }
.filters { padding: 20px; display: flex; flex-direction: column; gap: 8px; box-shadow: none; }
.lbl { font-size: .78rem; font-weight: 600; text-transform: uppercase; letter-spacing: .06em; color: var(--text-muted); margin-top: 10px; }
.lbl:first-child { margin-top: 0; }
.pills { display: flex; flex-wrap: wrap; gap: 6px; }
.pills button {
  font: 500 .85rem var(--sans); padding: .4em .8em; border-radius: 999px; cursor: pointer;
  border: 1px solid var(--border); background: var(--surface); color: var(--text);
}
.pills button.on { background: var(--accent); border-color: var(--accent); color: #1b1309; }
.reset { margin-top: 14px; background: none; border: 0; color: var(--link); font: 600 .88rem var(--sans); cursor: pointer; text-align: left; padding: 0; }
.toolbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; gap: 12px; flex-wrap: wrap; }
.sort { display: flex; align-items: center; gap: 8px; font-size: .9rem; color: var(--text-muted); }
.sort .input { width: auto; padding: .45em .8em; font-size: .9rem; }
.empty { padding: 40px; text-align: center; }
</style>
