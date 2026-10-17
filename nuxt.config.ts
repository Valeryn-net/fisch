export default defineNuxtConfig({
  compatibilityDate: '2026-10-01',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      titleTemplate: '%s · Fischwiki',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'An independent illustrated field guide to fish. Explore freshwater and marine species, historical plates, life histories and conservation notes.',
        },
        { name: 'theme-color', content: '#f2efe6' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&display=swap',
        },
      ],
    },
  },
  routeRules: {
    '/arten': { redirect: '/species' },
    '/glossar': { redirect: '/glossary' },
    '/ueber': { redirect: '/about' },
    '/arten/hecht': { redirect: '/species/pike' },
    '/arten/flussbarsch': { redirect: '/species/perch' },
    '/arten/karpfen': { redirect: '/species/carp' },
    '/arten/wels': { redirect: '/species/wels-catfish' },
    '/arten/bachforelle': { redirect: '/species/brown-trout' },
    '/arten/atlantischer-lachs': { redirect: '/species/atlantic-salmon' },
    '/arten/europaeischer-aal': { redirect: '/species/european-eel' },
    '/arten/atlantischer-hering': { redirect: '/species/atlantic-herring' },
    '/arten/kabeljau': { redirect: '/species/atlantic-cod' },
    '/arten/roter-thun': { redirect: '/species/atlantic-bluefin-tuna' },
    '/arten/weisser-hai': { redirect: '/species/great-white-shark' },
    '/arten/walhai': { redirect: '/species/whale-shark' },
    '/arten/quastenflosser': { redirect: '/species/coelacanth' },
    '/arten/rotfeuerfisch': { redirect: '/species/red-lionfish' },
  },
})
