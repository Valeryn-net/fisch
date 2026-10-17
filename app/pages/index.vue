<script setup lang="ts">
import { fische } from '~/data/fische'

useHead({ title: 'Startseite' })

const suche = ref('')
const router = useRouter()
function suchen() {
  router.push({ path: '/arten', query: suche.value ? { q: suche.value } : {} })
}

const featured = ['walhai', 'quastenflosser', 'europaeischer-aal']
  .map(s => fische.find(f => f.slug === s)!)
const neueste = fische.filter(f => !featured.includes(f)).slice(0, 6)

const bedroht = fische.filter(f => ['VU', 'EN', 'CR'].includes(f.iucn)).length
const kategorien = [
  { titel: 'Süßwasser', text: 'Flüsse, Bäche und Seen', filter: 'Süßwasser', icon: '≈' },
  { titel: 'Salzwasser', text: 'Küsten, Riffe und Hochsee', filter: 'Salzwasser', icon: '∿' },
  { titel: 'Brackwasser', text: 'Flussmündungen und Ostsee', filter: 'Brackwasser', icon: '◐' }
].map(k => ({ ...k, anzahl: fische.filter(f => f.lebensraum.includes(k.filter as never)).length }))
</script>

<template>
  <div>
    <section class="hero container">
      <div class="hero-inner">
        <div class="hero-text">
          <span class="eyebrow">Vol. 01 — Nachschlagewerk</span>
          <h1>Leise Geschichten aus <em>tiefem Wasser.</em></h1>
          <p class="lead">
            Steckbriefe, Lebensweise und Schutzstatus ausgewählter Arten aus Süß- und Salzwasser.
            Mit über 36.000 beschriebenen Arten sind Fische die artenreichste Gruppe der Wirbeltiere.
          </p>
          <form class="search" role="search" @submit.prevent="suchen">
            <input v-model="suche" class="input" type="search" placeholder="Art suchen, z. B. Hecht oder Salmo …" aria-label="Art suchen">
            <button class="btn" type="submit">Suchen</button>
          </form>
        </div>
        <div class="viewfinder" aria-hidden="true">
          <div class="vf-sky" />
          <div class="vf-glow" />
          <span class="c tl" /><span class="c tr" /><span class="c bl" /><span class="c br" />
          <div class="hud top"><span><b class="rec">●</b> REC</span><span>ISO 200 · WB 5600K</span></div>
          <div class="vf-art"><FishIllustration form="walhai" farbe="#c9874a" /></div>
          <div class="hud bottom"><span>1/60 · F2.8</span><span>Rhincodon typus</span><span>▮▮▮▯ 64min</span></div>
        </div>
      </div>
    </section>

    <div class="container stats-wrap">
      <div class="stats card">
        <div><strong>{{ fische.length }}</strong><span>Artenporträts</span></div>
        <div><strong>{{ new Set(fische.map(f => f.ordnung)).size }}</strong><span>Ordnungen</span></div>
        <div><strong>3</strong><span>Klassen</span></div>
        <div><strong>{{ bedroht }}</strong><span>gefährdete Arten</span></div>
      </div>
    </div>

    <section class="section container">
      <div class="section-head">
        <div>
          <span class="eyebrow">Im Fokus</span>
          <h2>Ausgewählte <em>Artikel</em></h2>
        </div>
      </div>
      <div class="featured">
        <NuxtLink v-for="(f, i) in featured" :key="f.slug" :to="`/arten/${f.slug}`" class="feat card" :class="{ big: i === 0 }">
          <div class="feat-art"><FishIllustration :form="f.form" :farbe="f.farbe" /></div>
          <div class="feat-body">
            <IucnBadge :status="f.iucn" />
            <h3>{{ f.name }}</h3>
            <p class="sci muted">{{ f.wissenschaftlich }}</p>
            <p class="muted">{{ f.kurz }}</p>
            <span class="more">Artikel lesen →</span>
          </div>
        </NuxtLink>
      </div>
    </section>

    <section class="section alt">
      <div class="container">
        <div class="section-head">
          <div>
            <span class="eyebrow">Lebensräume</span>
            <h2>Nach Gewässer <em>stöbern</em></h2>
          </div>
        </div>
        <div class="cats">
          <NuxtLink v-for="k in kategorien" :key="k.titel" :to="{ path: '/arten', query: { lebensraum: k.filter } }" class="cat card">
            <span class="cat-icon">{{ k.icon }}</span>
            <div>
              <h3>{{ k.titel }}</h3>
              <p class="muted">{{ k.text }}</p>
            </div>
            <span class="count">{{ k.anzahl }} Arten</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="section container">
      <div class="section-head">
        <div>
          <span class="eyebrow">Artenporträts</span>
          <h2>Weitere <em>Arten</em></h2>
        </div>
        <NuxtLink to="/arten">Alle {{ fische.length }} Arten ansehen →</NuxtLink>
      </div>
      <div class="masonry">
        <FishCard v-for="f in neueste" :key="f.slug" :fisch="f" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero { padding-top: 56px; padding-bottom: 24px; }
.hero-inner { display: grid; gap: 48px; align-items: center; grid-template-columns: 1fr; }
@media (min-width: 940px) { .hero-inner { grid-template-columns: 1.1fr .9fr; } }
.hero h1 { margin-top: 14px; max-width: 14ch; font-weight: 400; }
.lead { font-size: 1.08rem; color: var(--text-muted); max-width: 52ch; }
.search { display: flex; gap: 8px; margin-top: 28px; max-width: 520px; }

.viewfinder {
  position: relative; aspect-ratio: 4 / 5; border-radius: 22px; overflow: hidden;
  background: radial-gradient(80% 60% at 55% 55%, rgba(255,177,98,.22), transparent 70%), linear-gradient(170deg, #2c3b4d, #1b2632 60%, #0c1115);
  border: 1px solid var(--border);
  box-shadow: 0 30px 80px rgba(0,0,0,.5), inset 0 0 120px rgba(0,0,0,.55);
  font: 500 .68rem var(--mono); letter-spacing: .08em; color: rgba(238,233,223,.75);
}
.vf-sky { position: absolute; inset: 0; background: linear-gradient(180deg, transparent 0%, transparent 48%, rgba(163,81,57,.35) 72%, rgba(255,140,90,.32) 82%, rgba(214,90,120,.18) 90%, transparent 100%); }
.vf-glow { position: absolute; inset: 0; background: radial-gradient(circle at 70% 18%, rgba(255,177,98,.28), transparent 35%); filter: blur(10px); }
.vf-art { position: absolute; inset: 30% 10% 25%; display: grid; place-items: center; filter: drop-shadow(0 0 30px rgba(255,177,98,.25)) sepia(.15); animation: drift 9s ease-in-out infinite; }
@keyframes drift { 50% { transform: translate(-10px, 8px) rotate(-1.5deg); } }
@media (prefers-reduced-motion: reduce) { .vf-art { animation: none; } }
.hud { position: absolute; left: 26px; right: 26px; display: flex; justify-content: space-between; gap: 12px; }
.hud.top { top: 24px; } .hud.bottom { bottom: 24px; }
.rec { color: #e2553d; animation: blink 1.6s steps(2) infinite; }
@keyframes blink { 50% { opacity: 0; } }
.c { position: absolute; width: 22px; height: 22px; border-color: rgba(238,233,223,.6); border-style: solid; border-width: 0; }
.c.tl { top: 12px; left: 12px; border-top-width: 2px; border-left-width: 2px; }
.c.tr { top: 12px; right: 12px; border-top-width: 2px; border-right-width: 2px; }
.c.bl { bottom: 12px; left: 12px; border-bottom-width: 2px; border-left-width: 2px; }
.c.br { bottom: 12px; right: 12px; border-bottom-width: 2px; border-right-width: 2px; }
@media (max-width: 939px) { .viewfinder { aspect-ratio: 16 / 10; } }
@media (max-width: 520px) { .hud.bottom span:last-child { display: none; } }

.stats-wrap { margin-top: 32px; }
.stats { display: grid; grid-template-columns: repeat(2, 1fr); padding: 8px; }
@media (min-width: 700px) { .stats { grid-template-columns: repeat(4, 1fr); } }
.stats div { padding: 18px 20px; display: flex; flex-direction: column; }
.stats strong { font: 400 2.4rem var(--serif); color: var(--cream); font-style: italic; }
.stats span { color: var(--text-muted); font: 500 .7rem var(--mono); letter-spacing: .1em; text-transform: uppercase; }
.stats div + div { border-left: 1px solid var(--border); }

.featured { display: grid; gap: 20px; grid-template-columns: 1fr; }
@media (min-width: 900px) { .featured { grid-template-columns: 1.4fr 1fr; grid-template-rows: 1fr 1fr; } .feat.big { grid-row: span 2; } }
.feat { display: flex; flex-direction: column; color: inherit; overflow: hidden; transition: transform .18s; }
.feat:hover { transform: translateY(-3px); text-decoration: none; }
.feat-art { background: radial-gradient(70% 70% at 50% 60%, rgba(255,177,98,.14), transparent 70%), var(--bg-deep); padding: 32px 44px; border-bottom: 1px solid var(--border); }
.feat:not(.big) { flex-direction: row; }
.feat:not(.big) .feat-art { width: 38%; flex-shrink: 0; display: grid; place-items: center; padding: 16px; border-bottom: 0; border-right: 1px solid var(--border); }
.feat-body { padding: 20px 22px; display: flex; flex-direction: column; gap: 4px; }
.feat-body h3 { margin: 10px 0 0; font-size: 1.4rem; }
.feat.big h3 { font-size: 2rem; font-style: italic; }
.feat-body p { margin: 0 0 6px; font-size: .93rem; }
.more { color: var(--accent); font: 500 .72rem var(--mono); letter-spacing: .1em; text-transform: uppercase; margin-top: auto; padding-top: 8px; }
@media (max-width: 560px) { .feat:not(.big) { flex-direction: column; } .feat:not(.big) .feat-art { width: 100%; border-right: 0; border-bottom: 1px solid var(--border); } }

.alt { background: rgba(12,17,21,.45); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
.cats { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }
.cat { display: flex; align-items: center; gap: 16px; padding: 20px; color: inherit; box-shadow: none; }
.cat:hover { border-color: var(--accent); text-decoration: none; }
.cat h3 { margin: 0; }
.cat p { margin: 0; font-size: .9rem; }
.cat-icon { width: 44px; height: 44px; border-radius: 10px; display: grid; place-items: center; background: var(--accent-soft); color: var(--accent); font: 400 1.3rem var(--serif); flex-shrink: 0; }
.count { margin-left: auto; font: 500 .7rem var(--mono); letter-spacing: .08em; text-transform: uppercase; color: var(--accent); white-space: nowrap; }
.masonry { columns: 3 280px; column-gap: 22px; }
.masonry > * { break-inside: avoid; margin-bottom: 22px; }
.masonry > :nth-child(3n+1) :deep(.art) { padding-block: 64px; }
.masonry > :nth-child(3n+2) :deep(.art) { padding-block: 22px; }
.masonry > :nth-child(3n) :deep(.art) { padding-block: 44px; }
</style>
