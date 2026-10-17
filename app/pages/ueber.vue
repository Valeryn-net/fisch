<script setup lang="ts">
useHead({ title: 'Über & Quellen' })

const quellen = [
  { name: 'FishBase', url: 'https://www.fishbase.se', text: 'Globale Datenbank zu Fischarten – Maße, Höchstalter, Verbreitung und Systematik.' },
  { name: 'IUCN Red List of Threatened Species', url: 'https://www.iucnredlist.org', text: 'Referenz für die Gefährdungseinstufung der Arten.' },
  { name: 'Eschmeyer’s Catalog of Fishes', url: 'https://researcharchive.calacademy.org/research/ichthyology/catalog/fishcatmain.asp', text: 'Taxonomischer Katalog aller beschriebenen Fischarten (California Academy of Sciences).' },
  { name: 'CITES', url: 'https://cites.org', text: 'Washingtoner Artenschutzübereinkommen – Listung international gehandelter Arten.' },
  { name: 'ICCAT', url: 'https://www.iccat.int', text: 'Internationale Kommission zur Erhaltung der Thunfischbestände im Atlantik.' }
]
</script>

<template>
  <div class="container page">
    <nav class="crumbs"><NuxtLink to="/">Start</NuxtLink> / Über &amp; Quellen</nav>
    <div class="content">
      <h1>Über das <em>Fischwiki</em></h1>
      <p class="lead">
        Das Fischwiki ist ein kompaktes Nachschlagewerk zu ausgewählten Fischarten. Ziel ist es,
        verlässliche Informationen verständlich und übersichtlich darzustellen.
      </p>

      <h2>Zu den Daten</h2>
      <ul>
        <li><strong>Maximalwerte</strong> (Länge, Gewicht, Alter) sind dokumentierte Höchstwerte. Typische Exemplare sind meist deutlich kleiner.</li>
        <li><strong>Schutzstatus</strong> entspricht der globalen Einstufung der IUCN Roten Liste. Regionale Rote Listen können abweichen.</li>
        <li><strong>Systematik</strong> folgt der gängigen Einteilung; bei manchen Gruppen (z. B. Barschverwandten) ist die Zuordnung in der Forschung im Fluss.</li>
        <li>Die Abbildungen sind <strong>schematische Illustrationen</strong> und keine maßstabsgetreuen Darstellungen.</li>
      </ul>

      <h2>Quellen</h2>
      <div class="sources">
        <a v-for="q in quellen" :key="q.name" :href="q.url" target="_blank" rel="noopener" class="src card">
          <strong>{{ q.name }} ↗</strong>
          <span class="muted">{{ q.text }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page { padding-top: 28px; }
.content { max-width: 760px; }
.lead { font-size: 1.3rem; font-family: var(--serif); font-weight: 300; color: var(--cream); }
h2 { margin-top: 32px; }
li { margin-bottom: 8px; }
.sources { display: grid; gap: 12px; }
.src { display: flex; flex-direction: column; gap: 2px; padding: 16px 18px; color: inherit; box-shadow: none; }
.src:hover { border-color: var(--accent); text-decoration: none; }
</style>
