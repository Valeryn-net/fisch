# Fischwiki

An English-language fish field guide built with Nuxt 4 and Vue. The collection includes 20 species profiles, a searchable glossary, habitat and conservation filters, historical plates and an interactive ASCII water study.

## Development

Use Node.js 22 or newer.

```sh
npm ci
npm run dev
```

## Static export and deployment

```sh
npm run generate
```

The deployable site is in `.output/public`, including all species pages, assets, error pages and redirects from the original German URLs. No Node server is required in production.

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes the static output to the `deploy` branch. The existing Plesk Git integration should track **deploy**, with `/httpdocs` as the deployment directory. The Plesk webhook must be configured in GitHub for automatic updates on the host.

## Content and images

`app/data/species.ts` is the single source for species records, assessment dates, glossary entries and image attribution. Numeric records are approximate maxima, not typical adult sizes. Standard and total length are distinguished where the source reports them. IUCN assessment dates are shown on each species page; regional assessments and stock health may differ.

The historical illustrations are public domain. The coelacanth photograph is © Alberto Fernandez Fernandez, CC BY-SA 3.0, and its resized versions retain that licence. Full source records and image modifications are documented in [public/plates/CREDITS.md](public/plates/CREDITS.md) and on `/about#image-credits`.

The water study uses a locally rendered canvas, pauses when offscreen, offers a pause button and starts paused for visitors who prefer reduced motion. There are no image generation or animation dependencies. Fonts are loaded from Google Fonts, with system fallbacks.

## Verification

The production export has been exercised in Chromium at 375, 390, 768, 1024 and 1440 pixel widths. Checks cover all 20 species routes and images, direct filtered URLs, search, habitat/class/status filters, extinction-risk ordering, empty/reset states, browser Back, species-to-species navigation, glossary search, legacy redirects, the 404 page, mobile navigation, and reduced-motion behavior.
