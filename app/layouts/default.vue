<script setup lang="ts">
const route = useRoute()
const open = ref(false)
watch(() => route.fullPath, () => { open.value = false })

const nav = [
  { to: '/', label: 'Start' },
  { to: '/arten', label: 'Arten' },
  { to: '/glossar', label: 'Glossar' },
  { to: '/ueber', label: 'Über & Quellen' }
]
</script>

<template>
  <div class="shell">
    <header class="header">
      <div class="container bar">
        <NuxtLink to="/" class="logo">
          <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true"><path d="M5 16c4-6 11-7 16-3l5-4v14l-5-4c-5 4-12 3-16-3z" fill="#ffb162" /><circle cx="10" cy="15" r="1.4" fill="#12191f" /></svg>
          <span>Fisch<em>wiki</em></span>
        </NuxtLink>
        <button class="burger" :aria-expanded="open" aria-label="Menü" @click="open = !open">
          <span /><span /><span />
        </button>
        <nav :class="{ open }">
          <NuxtLink v-for="n in nav" :key="n.to" :to="n.to" class="nav-link" :class="{ active: n.to === '/' ? route.path === '/' : route.path.startsWith(n.to) }">{{ n.label }}</NuxtLink>
        </nav>
      </div>
    </header>

    <main><slot /></main>

    <footer class="footer">
      <div class="container foot">
        <div>
          <span class="foot-logo">Fisch<em>wiki</em></span>
          <p class="muted">Ein ruhiges Nachschlagewerk zu Fischarten aus Süß- und Salzwasser.</p>
          <p class="mono foot-hud">● REC · ISO 200 · 1/60 · F2.8</p>
        </div>
        <div class="muted small">
          Angaben nach FishBase und der IUCN Roten Liste. Maximalwerte beziehen sich auf dokumentierte Höchstwerte,
          nicht auf typische Größen. <NuxtLink to="/ueber">Mehr zu den Quellen</NuxtLink>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.shell { min-height: 100vh; display: flex; flex-direction: column; }
main { flex: 1; }
.header { position: sticky; top: 0; z-index: 50; background: rgba(12, 17, 21, .72); backdrop-filter: blur(14px) saturate(1.2); border-bottom: 1px solid var(--border); }
.bar { display: flex; align-items: center; justify-content: space-between; height: 66px; }
.logo { display: flex; align-items: center; gap: 10px; color: var(--cream); font: 500 1.35rem var(--serif); letter-spacing: -.01em; }
.logo:hover { text-decoration: none; }
.logo em, .foot-logo em { color: var(--accent); font-style: italic; }
nav { display: flex; gap: 2px; }
.nav-link { color: var(--text-muted); padding: 8px 14px; border-radius: 999px; font-weight: 500; font-size: .92rem; transition: color .15s, background .15s; }
.nav-link:hover { color: var(--cream); text-decoration: none; }
.nav-link.active { color: var(--accent); background: var(--accent-soft); }
.burger { display: none; background: none; border: 0; padding: 8px; cursor: pointer; }
.burger span { display: block; width: 22px; height: 2px; background: var(--cream); margin: 5px 0; border-radius: 2px; }

@media (max-width: 720px) {
  .burger { display: block; }
  nav { display: none; position: absolute; top: 66px; left: 0; right: 0; flex-direction: column; padding: 8px 16px 16px; background: rgba(12, 17, 21, .97); border-bottom: 1px solid var(--border); }
  nav.open { display: flex; }
}

.footer { border-top: 1px solid var(--border); background: rgba(12, 17, 21, .55); margin-top: 64px; }
.foot { display: grid; gap: 24px; grid-template-columns: 1fr; padding-top: 40px; padding-bottom: 40px; }
@media (min-width: 768px) { .foot { grid-template-columns: 1fr 1.4fr; } }
.foot-logo { font: 500 1.4rem var(--serif); }
.foot p { margin: 6px 0 0; }
.foot-hud { color: var(--accent-2); }
.small { font-size: .85rem; }
</style>
