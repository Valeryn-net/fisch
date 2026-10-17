<script setup lang="ts">
import type { Form } from '~/data/fische'

const props = defineProps<{ form: Form, farbe: string }>()
const id = useId()

const heights: Partial<Record<Form, number>> = { spindel: 22, hochrueckig: 32, gestreckt: 15, thun: 27 }
const h = computed(() => heights[props.form] ?? 22)

const isBony = computed(() => ['spindel', 'hochrueckig', 'gestreckt', 'thun'].includes(props.form))

const body = computed(() => {
  const k = h.value
  return `M20,60 C38,${60 - k} 110,${60 - k * 1.12} 168,${60 - k * 0.3} L168,${60 + k * 0.3} C110,${60 + k * 1.05} 38,${60 + k} 20,60Z`
})

const tail = computed(() => {
  const k = h.value
  if (props.form === 'thun') return `M164,60 Q188,52 214,${60 - k * 1.6} Q198,60 214,${60 + k * 1.6} Q188,68 164,60Z`
  if (props.form === 'gestreckt') return `M164,60 L204,${60 - k * 1.6} Q194,60 204,${60 + k * 1.6}Z`
  return `M164,60 L204,${60 - k * 1.25} Q192,60 204,${60 + k * 1.25}Z`
})

const dorsal = computed(() => {
  const k = h.value
  if (props.form === 'gestreckt') return `M128,${60 - k * 0.85} Q146,${60 - k * 1.9} 160,${60 - k * 0.45}Z`
  if (props.form === 'hochrueckig') return `M70,${60 - k * 1.06} L80,${60 - k * 1.6} L90,${60 - k * 1.62} L100,${60 - k * 1.55} L108,${60 - k * 1.05}Z M112,${60 - k * 1.02} Q128,${60 - k * 1.5} 140,${60 - k * 0.75}Z`
  if (props.form === 'thun') return `M82,${60 - k * 1.08} L96,${60 - k * 1.75} L104,${60 - k * 1.1}Z M120,${60 - k * 0.98} L130,${60 - k * 1.6} L136,${60 - k * 0.85}Z`
  return `M84,${60 - k * 1.05} Q100,${60 - k * 1.75} 120,${60 - k * 0.95}Z`
})

const anal = computed(() => {
  const k = h.value
  if (props.form === 'gestreckt') return `M128,${60 + k * 0.85} Q144,${60 + k * 1.7} 158,${60 + k * 0.45}Z`
  if (props.form === 'thun') return `M122,${60 + k * 0.95} L130,${60 + k * 1.55} L136,${60 + k * 0.85}Z`
  return `M118,${60 + k * 0.92} Q130,${60 + k * 1.45} 146,${60 + k * 0.7}Z`
})
</script>

<template>
  <svg class="fish" viewBox="0 0 240 120" role="img" aria-hidden="true">
    <defs>
      <linearGradient :id="`g${id}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" :stop-color="farbe" />
        <stop offset=".55" :stop-color="farbe" stop-opacity=".82" />
        <stop offset="1" stop-color="#c9c1b1" />
      </linearGradient>
    </defs>
    <g :fill="`url(#g${id})`" stroke="rgba(0,0,0,.18)" stroke-width=".8" stroke-linejoin="round">
      <!-- Knochenfische -->
      <template v-if="isBony">
        <path :d="tail" :fill="farbe" />
        <path :d="dorsal" :fill="farbe" />
        <path :d="anal" :fill="farbe" opacity=".85" />
        <path :d="body" />
        <path :d="`M60,${60 + h * 0.35} Q74,${60 + h * 0.9} 86,${60 + h * 0.45}Z`" :fill="farbe" opacity=".8" />
        <path :d="`M50,${60 - h * 0.62} Q46,60 50,${60 + h * 0.62}`" fill="none" stroke="rgba(0,0,0,.25)" stroke-width="1.4" />
        <path :d="`M54,${60 - h * 0.05} L160,${60 - h * 0.1}`" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="1" />
        <template v-if="form === 'thun'">
          <path v-for="i in 5" :key="i" :d="`M${136 + i * 5},${60 - h * (0.75 - i * 0.08)} l3,-4 l1,4Z`" :fill="farbe" />
          <path v-for="i in 5" :key="`u${i}`" :d="`M${136 + i * 5},${60 + h * (0.75 - i * 0.08)} l3,4 l1,-4Z`" :fill="farbe" />
        </template>
        <template v-if="form === 'hochrueckig'">
          <path v-for="i in 6" :key="i" :d="`M${56 + i * 15},${60 - h * 0.95} q-3,${h} 0,${h * 1.75}`" fill="none" stroke="rgba(0,0,0,.22)" stroke-width="3.2" />
        </template>
        <circle cx="36" cy="56" r="3.6" fill="#0c1115" stroke="#eee9df" stroke-width="1.2" />
      </template>

      <!-- Aal -->
      <template v-else-if="form === 'aal'">
        <path d="M18,62 C50,40 80,44 110,60 S170,80 222,54" fill="none" :stroke="farbe" stroke-width="22" stroke-linecap="round" opacity=".45" />
        <path d="M18,62 C50,40 80,44 110,60 S170,80 222,54" fill="none" :stroke="farbe" stroke-width="13" stroke-linecap="round" />
        <path d="M24,60 C50,46 80,49 110,63 S170,80 220,56" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="2" />
        <circle cx="22" cy="57" r="2.6" fill="#0c1115" stroke="#eee9df" stroke-width="1" />
        <path d="M42,58 q6,10 12,0 z" :fill="farbe" />
      </template>

      <!-- Wels -->
      <template v-else-if="form === 'wels'">
        <path d="M100,64 L198,64 Q200,80 186,82 L106,74Z" :fill="farbe" />
        <path d="M188,52 Q222,58 220,70 Q218,84 186,78Z" :fill="farbe" />
        <path d="M16,62 C22,40 70,38 120,48 C160,54 190,56 198,60 L198,72 C160,78 90,86 40,80 C24,77 14,72 16,62Z" />
        <path d="M66,44 L72,34 L80,44Z" :fill="farbe" />
        <path d="M22,58 C2,46 -6,30 8,22" fill="none" :stroke="farbe" stroke-width="2" />
        <path d="M24,62 C6,66 0,78 6,90" fill="none" :stroke="farbe" stroke-width="2" />
        <path d="M24,74 q-6,6 -4,14 M30,76 q-3,6 0,13" fill="none" :stroke="farbe" stroke-width="1.4" />
        <path d="M14,66 Q40,70 52,64" fill="none" stroke="rgba(0,0,0,.35)" stroke-width="1.4" />
        <circle cx="34" cy="55" r="2.6" fill="#0c1115" stroke="#eee9df" stroke-width="1" />
        <path d="M60,78 Q72,96 88,82Z" :fill="farbe" />
      </template>

      <!-- Hai -->
      <template v-else-if="form === 'hai'">
        <path d="M170,60 L222,18 Q212,50 206,62 L216,90Z" :fill="farbe" />
        <path d="M88,44 L106,10 L122,44Z" :fill="farbe" />
        <path d="M150,48 L156,38 L160,50Z" :fill="farbe" />
        <path d="M12,62 C30,42 110,36 176,56 L176,66 C120,84 44,86 12,66Z" />
        <path d="M66,74 L46,106 L94,76Z" :fill="farbe" />
        <path d="M130,76 L136,90 L146,76Z" :fill="farbe" />
        <path d="M12,64 C40,66 110,62 176,62" fill="none" stroke="rgba(255,255,255,.5)" stroke-width="1" />
        <path d="M52,52 q-3,9 0,18 M57,52 q-3,9 0,18 M62,52 q-3,9 0,18 M67,53 q-3,8 0,16 M72,54 q-3,8 0,15" fill="none" stroke="rgba(0,0,0,.3)" stroke-width="1.1" />
        <circle cx="30" cy="56" r="2.6" fill="#0d1a22" />
        <path d="M16,70 Q28,74 40,70" fill="none" stroke="rgba(0,0,0,.35)" stroke-width="1.2" />
      </template>

      <!-- Walhai -->
      <template v-else-if="form === 'walhai'">
        <path d="M172,58 L224,20 Q214,50 208,62 L218,92Z" :fill="farbe" />
        <path d="M100,40 L114,12 L130,42Z" :fill="farbe" />
        <path d="M10,54 C14,40 90,32 178,54 L178,68 C120,86 40,88 12,72 C8,66 8,60 10,54Z" />
        <path d="M60,76 L40,108 L92,78Z" :fill="farbe" />
        <path d="M10,66 L30,66" stroke="rgba(0,0,0,.45)" stroke-width="2" />
        <path d="M40,52 L172,56 M44,60 L172,60" fill="none" stroke="rgba(255,255,255,.3)" stroke-width="1" />
        <g fill="rgba(255,255,255,.7)" stroke="none">
          <circle v-for="(p, i) in [[50,46],[64,44],[78,43],[92,44],[106,46],[120,48],[134,50],[148,52],[58,52],[72,51],[86,50],[100,51],[114,52],[128,54],[142,55],[156,56],[66,58],[80,57],[94,57],[108,58],[122,59],[136,59]]" :key="i" :cx="p[0]" :cy="p[1]" r="1.6" />
        </g>
        <circle cx="28" cy="58" r="2.2" fill="#0d1a22" />
      </template>

      <!-- Quastenflosser -->
      <template v-else-if="form === 'quastenflosser'">
        <path d="M168,60 L200,30 L196,52 L222,60 L196,68 L200,90Z" :fill="farbe" />
        <path d="M70,40 L80,18 L96,40Z" :fill="farbe" />
        <path d="M18,58 C30,36 110,32 172,52 L172,68 C110,88 30,84 18,62Z" />
        <g :fill="farbe">
          <path d="M120,40 Q126,28 140,22 Q146,30 136,44Z" />
          <path d="M120,80 Q126,92 140,98 Q146,90 136,76Z" />
          <path d="M56,72 Q50,90 62,104 Q72,96 68,74Z" />
          <path d="M92,80 Q90,96 100,106 Q110,98 104,80Z" />
        </g>
        <g fill="rgba(255,255,255,.75)" stroke="none">
          <circle cx="62" cy="52" r="2.2" /><circle cx="84" cy="62" r="1.6" /><circle cx="104" cy="50" r="2" />
          <circle cx="124" cy="62" r="1.8" /><circle cx="146" cy="56" r="1.6" /><circle cx="74" cy="66" r="1.4" />
        </g>
        <circle cx="34" cy="54" r="3.4" fill="#0d1a22" stroke="#9bd" stroke-width="1" />
      </template>

      <!-- Rotfeuerfisch -->
      <template v-else-if="form === 'feuerfisch'">
        <g :stroke="farbe" stroke-width="1.6" fill="none">
          <path d="M70,40 L58,4 M80,38 L74,2 M90,36 L90,4 M100,36 L106,6 M110,38 L120,10 M120,40 L134,16" />
        </g>
        <g :fill="farbe" opacity=".55">
          <path d="M60,66 Q40,96 70,116 Q90,100 80,70Z" />
          <path d="M70,66 Q66,106 104,112 Q110,90 86,68Z" />
        </g>
        <path d="M150,60 L190,34 Q180,60 190,86Z" :fill="farbe" opacity=".7" />
        <path d="M20,60 C30,32 110,30 156,54 L156,66 C110,90 30,88 20,60Z" />
        <g stroke="rgba(255,255,255,.75)" stroke-width="3.2" fill="none">
          <path v-for="i in 7" :key="i" :d="`M${38 + i * 15},38 q-4,22 0,44`" />
        </g>
        <path d="M28,54 l-6,-10 M34,52 l0,-10" :stroke="farbe" stroke-width="1.4" />
        <circle cx="34" cy="58" r="3.2" fill="#0c1115" stroke="#eee9df" stroke-width="1" />
      </template>
    </g>
  </svg>
</template>

<style scoped>
.fish { width: 100%; height: auto; display: block; overflow: visible; }
</style>
