<script setup lang="ts">
import { species, statusInfo } from '~/data/species'
definePageMeta({ key: (route) => route.path })
const route = useRoute()
const fish = species.find((f) => f.slug === route.params.slug)
if (!fish)
  throw createError({
    statusCode: 404,
    statusMessage: 'Species not found',
    fatal: true,
  })
const f = fish
const assessmentDate = new Intl.DateTimeFormat('en-GB', {
  dateStyle: 'long',
  timeZone: 'UTC',
}).format(new Date(f.assessedOn))
useHead({ title: f.name, meta: [{ name: 'description', content: f.lede }] })
const index = species.indexOf(f)
const next = species[(index + 1) % species.length]!
const sections = [
  { id: 'appearance', title: 'A closer look', text: f.appearance },
  { id: 'behaviour', title: 'How it lives', text: f.behaviour },
  { id: 'reproduction', title: 'The next generation', text: f.reproduction },
  { id: 'conservation', title: 'Conservation', text: f.conservation },
]
const related = species
  .filter((x) => x.slug !== f.slug)
  .map((x) => ({
    fish: x,
    score:
      (x.family === f.family ? 3 : 0) +
      (x.order === f.order ? 2 : 0) +
      x.habitat.filter((h) => f.habitat.includes(h)).length,
  }))
  .sort((a, b) => b.score - a.score)
  .slice(0, 3)
const fishbase = `https://www.fishbase.se/summary/${f.latin.replaceAll(' ', '-')}.html`
const iucn = `https://www.iucnredlist.org/search?query=${encodeURIComponent(f.latin)}&searchType=species`
</script>

<template>
  <article class="container page species-page">
    <div class="section-kicker mono">
      <NuxtLink to="/species">← The collection</NuxtLink
      ><span
        >Species {{ String(index + 1).padStart(2, '0') }} /
        {{ species.length }}</span
      >
    </div>
    <header class="species-header">
      <div>
        <span class="mono eyebrow"
          >{{ f.family }} / {{ f.habitat.join(' + ') }}</span
        >
        <h1>{{ f.name }}<span>.</span></h1>
        <p class="species-latin">
          <i>{{ f.latin }}</i
          ><span>{{ f.authority }}</span>
        </p>
        <p class="species-lede">{{ f.lede }}</p>
        <IucnBadge :status="f.status" />
      </div>
      <figure class="species-figure">
        <a
          :href="f.plate.file"
          target="_blank"
          rel="noopener"
          :aria-label="`Open the full plate of ${f.name}`"
          ><img
            :src="f.plate.file"
            :alt="f.plate.caption"
            width="1600"
            height="1000"
            fetchpriority="high"
        /></a>
        <figcaption>
          <span>{{ f.plate.caption }}</span
          ><a :href="f.plate.url" target="_blank" rel="noopener"
            >Source & licence ↗</a
          >
        </figcaption>
      </figure>
    </header>
    <div class="species-body">
      <aside class="field-notes">
        <span class="mono eyebrow">Field notes</span>
        <dl class="data-list">
          <div>
            <dt>Reported length</dt>
            <dd>{{ f.length }}</dd>
          </div>
          <div>
            <dt>Reported weight</dt>
            <dd>{{ f.weight }}</dd>
          </div>
          <div>
            <dt>Reported lifespan</dt>
            <dd>{{ f.lifespan }}</dd>
          </div>
          <div>
            <dt>Diet</dt>
            <dd>{{ f.diet }}</dd>
          </div>
          <div>
            <dt>Habitat</dt>
            <dd>{{ f.habitat.join(', ') }}</dd>
          </div>
          <div v-if="f.migration">
            <dt>Migration</dt>
            <dd>{{ f.migration }}</dd>
          </div>
        </dl>
        <p class="fine-print">
          Maximum records, not typical sizes. “c.” means approximately;
          estimates and captive records are marked. Standard length excludes the
          tail fin; total length includes it.
        </p>
        <span class="mono eyebrow taxonomy-label">Taxonomy</span>
        <dl class="data-list">
          <div>
            <dt>Class</dt>
            <dd>{{ f.className }}</dd>
          </div>
          <div>
            <dt>Order</dt>
            <dd>{{ f.order }}</dd>
          </div>
          <div>
            <dt>Family</dt>
            <dd>{{ f.family }}</dd>
          </div>
        </dl>
        <nav class="article-nav" aria-label="On this page">
          <a
            v-for="section in sections"
            :key="section.id"
            :href="`#${section.id}`"
            >{{ section.title }} ↗</a
          >
        </nav>
      </aside>
      <div class="article-copy">
        <section class="article-section">
          <span class="mono eyebrow">Distribution</span>
          <h2>Where to find it.</h2>
          <p>{{ f.range }}</p>
          <p v-if="f.aka?.length" class="muted">
            Also known as {{ f.aka.join(', ') }}.
          </p>
        </section>
        <section
          v-for="(section, i) in sections"
          :id="section.id"
          :key="section.id"
          class="article-section"
        >
          <span class="mono eyebrow">0{{ i + 1 }} / {{ section.id }}</span>
          <h2>
            {{ section.title
            }}<span v-if="section.id !== 'conservation'">.</span>
          </h2>
          <p>{{ section.text }}</p>
          <template v-if="section.id === 'conservation'"
            ><IucnScale :status="f.status" />
            <p class="fine-print">
              {{ statusInfo[f.status] }} — global IUCN assessment dated
              {{ assessmentDate }}. Regional populations can have a different
              status.
              <a :href="iucn" target="_blank" rel="noopener"
                >View the Red List record ↗</a
              >
            </p></template
          >
        </section>
        <section class="article-section">
          <span class="mono eyebrow">A few more things</span>
          <h2>In the margins.</h2>
          <ul class="margin-notes">
            <li v-for="note in f.notes" :key="note">{{ note }}</li>
          </ul>
        </section>
        <section class="article-section article-sources">
          <span class="mono eyebrow">Sources & image credit</span>
          <p>
            <a :href="fishbase" target="_blank" rel="noopener"
              >FishBase — {{ f.latin }} ↗</a
            ><br /><a :href="iucn" target="_blank" rel="noopener"
              >IUCN Red List — assessment ↗</a
            >
          </p>
          <p>
            {{ f.plate.source }}.
            {{ f.plate.author ? `Author: ${f.plate.author}. ` : ''
            }}<a :href="f.plate.url" target="_blank" rel="noopener"
              >{{ f.plate.license }} ↗</a
            >. Reproduced as resized WebP files<span
              v-if="f.slug === 'atlantic-salmon'"
              >, with cropped margins</span
            >.<template v-if="f.plate.license === 'CC BY-SA 3.0'">
              Licensed under
              <a
                href="https://creativecommons.org/licenses/by-sa/3.0/"
                target="_blank"
                rel="noopener"
                >Creative Commons Attribution-ShareAlike 3.0</a
              >; the adapted image is shared under the same licence.</template
            >
          </p>
        </section>
      </div>
    </div>
    <section class="section">
      <div class="section-heading">
        <h2>Keep <em>looking.</em></h2>
        <NuxtLink :to="`/species/${next.slug}`" class="text-link"
          >Next: {{ next.name }} ↗</NuxtLink
        >
      </div>
      <div class="fish-grid">
        <FishCard
          v-for="item in related"
          :key="item.fish.slug"
          :fish="item.fish"
        />
      </div>
    </section>
  </article>
</template>
