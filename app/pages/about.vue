<script setup lang="ts">
import { species } from '~/data/species'
useHead({ title: 'About & sources' })
const sources = [
  {
    name: 'FishBase',
    url: 'https://www.fishbase.se/search.php',
    text: 'Species profiles, distribution, reported maximum sizes and life histories.',
  },
  {
    name: 'IUCN Red List',
    url: 'https://www.iucnredlist.org/',
    text: 'Global extinction risk assessments. The publication year matters: an assessment may be much older than this website.',
  },
  {
    name: 'Eschmeyer’s Catalog of Fishes',
    url: 'https://researcharchive.calacademy.org/research/ichthyology/catalog/fishcatmain.asp',
    text: 'Scientific names and taxonomy, maintained by the California Academy of Sciences.',
  },
  {
    name: 'Biodiversity Heritage Library',
    url: 'https://www.biodiversitylibrary.org/bibliography/5787',
    text: 'Digitised volumes of Bloch’s Ichthyologie and the source of most historical plates in this collection.',
  },
  {
    name: 'IUCN: Atlantic salmon assessment, 2023',
    url: 'https://iucn.org/press-release/202312/freshwater-fish-highlight-escalating-climate-impacts-species-iucn-red-list',
    text: 'The global reassessment of Atlantic salmon as Near Threatened.',
  },
  {
    name: 'IUCN: Tuna reassessment, 2021',
    url: 'https://iucn.org/news/species/202109/tuna-species-recovering-despite-growing-pressures-marine-life-iucn-red-list',
    text: 'Atlantic bluefin tuna’s change to Least Concern, with important differences between regional stocks.',
  },
]
</script>
<template>
  <div class="container page about-page">
    <div class="section-kicker mono">
      <NuxtLink to="/">Fischwiki /</NuxtLink><span>About the archive</span>
    </div>
    <header class="page-title">
      <h1>Made for<br /><em>the curious.</em></h1>
      <p>A small, independent fish wiki.<br />No grand expedition required.</p>
    </header>
    <div class="about-intro">
      <figure>
        <img
          src="/plates/tench.webp"
          alt="Historic copper engraving of a tench"
          width="1600"
          height="1000"
          loading="lazy"
        />
        <figcaption class="mono">Cyprinus tinca / Bloch, pl. XIV</figcaption>
      </figure>
      <div>
        <span class="mono eyebrow">The idea</span>
        <h2>A cabinet of<br /><em>aquatic curiosities.</em></h2>
        <p>
          Fischwiki is a personal, non-commercial project about fish. There are
          familiar river species here, open-ocean travellers and a few animals
          that look like someone got carried away.
        </p>
        <p>
          The illustrations come mostly from the eighteenth-century work of
          Marcus Elieser Bloch. The species notes use modern names and describe
          how these animals live, reproduce and fare in the wild.
        </p>
      </div>
    </div>
    <div class="about-content">
      <section class="article-section">
        <span class="mono eyebrow">How to read the records</span>
        <h2>A note on the numbers.</h2>
        <p>
          Lengths and weights are reported maxima unless otherwise stated. Most
          fish you encounter will be smaller. Ages may be estimates or captive
          records; those are marked in the profiles. Standard length excludes
          the tail fin; total length includes it. A maximum is not a promise.
        </p>
        <p>
          The conservation labels describe global IUCN assessments, which are
          published in different years. Atlantic cod’s widely cited Vulnerable
          assessment, for example, dates to 1996. Consult the linked record and
          local conservation guidance for a current decision.
        </p>
        <p>
          Taxonomic placements can differ between authorities. Historical plate
          captions also use names that have since changed. These images are
          documents of natural history, rather than identification diagrams or
          scale drawings.
        </p>
      </section>
      <section class="article-section">
        <span class="mono eyebrow">Further reading</span>
        <h2>The reference shelf.</h2>
        <a
          v-for="source in sources"
          :key="source.url"
          :href="source.url"
          target="_blank"
          rel="noopener"
          class="source-row"
          ><strong>{{ source.name }} ↗</strong><span>{{ source.text }}</span></a
        >
      </section>
    </div>
    <section id="image-credits" class="section image-credits">
      <div class="section-heading">
        <div>
          <span class="mono eyebrow">Images & reuse</span>
          <h2>The original <em>plates.</em></h2>
        </div>
        <p class="muted section-note">
          Locally hosted, with a source for every image.<br />Click a title to
          see its original record.
        </p>
      </div>
      <p class="credits-intro">
        The Bloch and Andrew Smith illustrations below are in the public domain.
        The coelacanth photograph is by Alberto Fernandez Fernandez, licensed
        under
        <a
          href="https://creativecommons.org/licenses/by-sa/3.0/"
          target="_blank"
          rel="noopener"
          >CC BY-SA 3.0</a
        >. Images have been resized and converted to WebP; the salmon plate has
        also been cropped. The adapted coelacanth files retain CC BY-SA 3.0.
      </p>
      <div class="credits-table">
        <div v-for="fish in species" :key="fish.slug" class="credit-row">
          <a :href="fish.plate.url" target="_blank" rel="noopener"
            >{{ fish.name }} ↗</a
          ><span>{{ fish.plate.source }}</span
          ><span class="mono">{{ fish.plate.license }}</span>
        </div>
        <div class="credit-row">
          <a
            href="https://commons.wikimedia.org/wiki/File:Ichthyologie;_ou,_Histoire_naturelle_des_poissons_(Plate_17)_(7064400241).jpg"
            target="_blank"
            rel="noopener"
            >Carp varieties (home page) ↗</a
          ><span>M. E. Bloch, Ichthyologie, pl. 17</span
          ><span class="mono">Public domain</span>
        </div>
      </div>
    </section>
  </div>
</template>
