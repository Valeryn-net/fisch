<script setup lang="ts">
import { species, statusInfo, statusScale, type Habitat } from '~/data/species'
useHead({ title: 'The collection' })
const route = useRoute()
const router = useRouter()
// Static exports have no request query on the server. Apply URL filters after hydration.
const hydrated = ref(false)
onMounted(() => {
  hydrated.value = true
})
function textParam(value: unknown) {
  return typeof value === 'string' ? value : ''
}
const query = computed({
  get: () => (hydrated.value ? textParam(route.query.q) : ''),
  set: (value) => update('q', value),
})
const habitat = computed({
  get: () => (hydrated.value ? textParam(route.query.habitat) : ''),
  set: (value) => update('habitat', value),
})
const status = computed({
  get: () => (hydrated.value ? textParam(route.query.status) : ''),
  set: (value) => update('status', value),
})
const className = computed({
  get: () => (hydrated.value ? textParam(route.query.class) : ''),
  set: (value) => update('class', value),
})
const sort = computed({
  get: () => (hydrated.value ? textParam(route.query.sort) || 'name' : 'name'),
  set: (value) => update('sort', value === 'name' ? '' : value),
})
function update(key: string, value: string) {
  const next = { ...route.query }
  if (value) next[key] = value
  else delete next[key]
  router.replace({ query: next })
}
const habitats: Habitat[] = ['Freshwater', 'Marine', 'Brackish']
const classes = [...new Set(species.map((f) => f.className))]
const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
const results = computed(() => {
  const term = normalize(query.value.trim())
  return species
    .filter(
      (f) =>
        (!term ||
          [f.name, f.latin, f.family, ...(f.aka ?? [])].some((text) =>
            normalize(text).includes(term),
          )) &&
        (!habitat.value || f.habitat.includes(habitat.value as Habitat)) &&
        (!status.value || f.status === status.value) &&
        (!className.value || f.className === className.value),
    )
    .sort((a, b) =>
      sort.value === 'status'
        ? statusScale.indexOf(b.status) - statusScale.indexOf(a.status) ||
          a.name.localeCompare(b.name, 'en')
        : a.name.localeCompare(b.name, 'en'),
    )
})
const hasFilters = computed(
  () => !!(query.value || habitat.value || status.value || className.value),
)
function reset() {
  router.replace({ path: '/species' })
}
</script>

<template>
  <div class="container page">
    <div class="section-kicker mono">
      <NuxtLink to="/">Fischwiki /</NuxtLink><span>The species index</span>
    </div>
    <header class="page-title">
      <h1>The <em>collection.</em></h1>
      <p>
        {{ species.length }} species. Fresh water, salt water, and the places in
        between.<br />Begin with a name, or see what catches your eye.
      </p>
    </header>
    <div class="collection-tools">
      <div class="collection-search">
        <label for="species-search" class="mono">Search the collection</label
        ><input
          id="species-search"
          v-model="query"
          type="search"
          placeholder="Common name, Latin name or family…"
        />
      </div>
      <div class="filter-row">
        <fieldset class="habitat-filter">
          <legend class="sr-only">Filter by habitat</legend>
          <button
            :aria-pressed="!habitat"
            :class="{ active: !habitat }"
            @click="habitat = ''"
          >
            All waters</button
          ><button
            v-for="water in habitats"
            :key="water"
            :aria-pressed="habitat === water"
            :class="{ active: habitat === water }"
            @click="habitat = water"
          >
            {{ water }}
          </button>
        </fieldset>
        <label class="select-filter"
          >Class
          <select v-model="className">
            <option value="">All classes</option>
            <option v-for="name in classes" :key="name">{{ name }}</option>
          </select></label
        ><label class="select-filter"
          >IUCN
          <select v-model="status">
            <option value="">All assessments</option>
            <option v-for="code in statusScale" :key="code" :value="code">
              {{ statusInfo[code] }}
            </option>
          </select></label
        >
      </div>
    </div>
    <div class="collection-summary">
      <p class="mono" role="status" aria-live="polite">
        {{ String(results.length).padStart(2, '0') }}
        species{{ hasFilters ? ' found' : ' in the archive'
        }}<button v-if="hasFilters" class="reset-button" @click="reset">
          Clear filters ×
        </button>
      </p>
      <label class="select-filter"
        >Sort by
        <select v-model="sort">
          <option value="name">Name A–Z</option>
          <option value="status">Extinction risk</option>
        </select></label
      >
    </div>
    <div v-if="results.length" class="fish-grid collection-grid">
      <FishCard
        v-for="fish in results"
        :key="fish.slug"
        :fish="fish"
        :number="species.indexOf(fish) + 1"
      />
    </div>
    <div v-else class="empty-state">
      <span class="mono" aria-hidden="true">&gt;&lt;(((°&gt;</span>
      <h2>No fish in these waters.</h2>
      <p>Try another name or broaden the filters.</p>
      <button class="text-link" @click="reset">Reset the collection ↗</button>
    </div>
  </div>
</template>
