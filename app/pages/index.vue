<script setup lang="ts">
import { species, type Habitat } from '~/data/species'
useHead({ title: 'An independent field guide to fish' })
const query = ref('')
const router = useRouter()
const featured = ['perch', 'whale-shark', 'coelacanth'].map((slug) =>
  species.find((f) => f.slug === slug)!,
)
const habitats: { name: Habitat; title: string; description: string }[] = [
  {
    name: 'Freshwater',
    title: 'Rivers & lakes',
    description: 'From gravel streams to the quiet of a reed bed.',
  },
  {
    name: 'Marine',
    title: 'Seas & oceans',
    description: 'Life on the reef, along the coast and out in the blue.',
  },
  {
    name: 'Brackish',
    title: 'Between the two',
    description: 'Estuaries and bays, where fresh water meets the sea.',
  },
]
</script>

<template>
  <div>
    <section class="home-hero container">
      <div class="section-kicker mono">
        <span>The ichthyology collection</span
        ><span>Volume 01 / {{ species.length }} species</span>
      </div>
      <h1>A field guide<br />to <em>fish.</em></h1>
      <div class="hero-under">
        <div class="hero-intro">
          <p>For the familiar fish.<br />And the wonderfully unfamiliar.</p>
          <p class="muted">
            An illustrated collection of freshwater and marine life. A little
            natural history, one species at a time.
          </p>
          <NuxtLink to="/species" class="text-link"
            >Open the collection <span>↗</span></NuxtLink
          >
        </div>
        <figure class="hero-plate">
          <img
            src="/plates/pike.webp"
            alt="Hand-coloured historical plate of a northern pike by Marcus Elieser Bloch"
            width="1600"
            height="940"
            fetchpriority="high"
          />
          <figcaption class="mono">
            <span>Fig. 01 — Northern pike<br /><i>Esox lucius</i></span
            ><span>M. E. Bloch<br />Pl. XXXII · Public domain</span>
          </figcaption>
        </figure>
      </div>
      <div class="hero-bottom mono">
        <span>Look closely. There’s more down here.</span
        ><a href="#selected">Scroll to explore ↓</a>
      </div>
    </section>

    <section id="selected" class="section container">
      <div class="section-heading">
        <div>
          <span class="mono eyebrow">01 / From the collection</span>
          <h2>A few to get<br /><em>acquainted with.</em></h2>
        </div>
        <NuxtLink to="/species" class="text-link"
          >All {{ species.length }} species <span>↗</span></NuxtLink
        >
      </div>
      <div class="fish-grid featured-grid">
        <FishCard
          v-for="(fish, i) in featured"
          :key="fish.slug"
          :fish="fish"
          :number="i + 2"
        />
      </div>
    </section>

    <div class="container"><WaterStudy /></div>

    <section class="section container habitats-section">
      <div class="section-heading">
        <div>
          <span class="mono eyebrow">02 / Follow the water</span>
          <h2>Find your <em>waters.</em></h2>
        </div>
        <p class="muted section-note">
          Some fish belong to more than one world.<br />Our habitat categories
          overlap, too.
        </p>
      </div>
      <NuxtLink
        v-for="(habitat, i) in habitats"
        :key="habitat.name"
        :to="{ path: '/species', query: { habitat: habitat.name } }"
        class="habitat-row"
        ><span class="mono habitat-index">0{{ i + 1 }}</span>
        <h3>{{ habitat.title }}</h3>
        <p>{{ habitat.description }}</p>
        <span class="mono"
          >{{
            String(
              species.filter((f) => f.habitat.includes(habitat.name)).length,
            ).padStart(2, '0')
          }}
          species</span
        ><span class="habitat-arrow">↗</span></NuxtLink
      >
    </section>

    <section class="archive-note container">
      <span class="mono eyebrow">A note on the pictures</span>
      <div>
        <h2>Old plates.<br /><em>New perspectives.</em></h2>
        <p>
          Most of these fish were drawn more than two centuries ago. Bloch’s
          hand-coloured engravings sit alongside modern species notes — a
          reminder that looking closely never gets old.
        </p>
        <NuxtLink to="/about" class="text-link"
          >About the archive <span>↗</span></NuxtLink
        >
      </div>
      <img
        src="/plates/royal-carp-sm.webp"
        alt="An eighteenth-century carp engraving from Bloch’s Ichthyologie"
        width="640"
        height="400"
        loading="lazy"
      />
    </section>

    <section class="search-band container">
      <label for="home-search" class="mono"
        >Looking for someone in particular?</label
      >
      <form
        role="search"
        @submit.prevent="
          router.push({
            path: '/species',
            query: query.trim() ? { q: query.trim() } : {},
          })
        "
      >
        <input
          id="home-search"
          v-model="query"
          type="search"
          placeholder="A name, a family, a Latin name…"
        /><button type="submit" aria-label="Search the collection">↗</button>
      </form>
    </section>
  </div>
</template>
