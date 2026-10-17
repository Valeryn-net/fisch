<script setup lang="ts">
const props = defineProps<{ kind: 'water' | 'kelp' }>()

// Fixed character fields keep the ornament identical in the HTML and in Vue.
function water() {
  return Array.from({ length: 21 }, (_, y) =>
    Array.from({ length: 108 }, (_, x) => {
      const swell =
        Math.sin(x * 0.105 + y * 0.58) * 1.5 + Math.cos(x * 0.047 - y * 0.32)
      if (Math.abs(swell) < 0.22) return '~'
      if (Math.abs(swell) < 0.38) return '-'
      if (Math.abs(swell) < 0.5 && (x + y) % 3 === 0) return '.'
      return ' '
    }).join(''),
  ).join('\n')
}

function kelp() {
  const width = 164
  const height = 27
  const field = Array.from({ length: height }, () => Array(width).fill(' '))
  function put(x: number, y: number, character: string) {
    if (x >= 0 && x < width && y >= 0 && y < height) field[y]![x] = character
  }
  function stamp(x: number, y: number, lines: string[]) {
    lines.forEach((line, row) => {
      Array.from(line).forEach((character, column) => {
        if (character !== ' ') put(x + column, y + row, character)
      })
    })
  }
  const plants = [
    { x: 8, size: 10, seed: 1 },
    { x: 21, size: 19, seed: 3 },
    { x: 36, size: 24, seed: 2 },
    { x: 52, size: 14, seed: 4 },
    { x: 110, size: 18, seed: 2 },
    { x: 127, size: 25, seed: 5 },
    { x: 143, size: 20, seed: 1 },
    { x: 157, size: 11, seed: 3 },
  ]
  for (const plant of plants) {
    for (let step = 0; step < plant.size; step++) {
      const row = height - 3 - step
      const bend = Math.sin(step * 0.22 + plant.seed) * (step / plant.size) * 4
      const x = Math.round(plant.x + bend)
      const previous = Math.round(
        plant.x +
          Math.sin((step - 1) * 0.22 + plant.seed) *
            ((step - 1) / plant.size) *
            4,
      )
      put(
        x,
        row,
        step === plant.size - 1
          ? '.'
          : x === previous
            ? '|'
            : x > previous
              ? '/'
              : '\\',
      )
      if (step > 2 && step < plant.size - 2 && step % 4 === plant.seed % 4) {
        const right = (Math.floor(step / 4) + plant.seed) % 2 === 0
        stamp(
          x + (right ? 1 : -4),
          row - 2,
          right
            ? ['  /)', ' / /', '/ / ', '|/  ']
            : ['(\\  ', ' \\ \\', '  \\ \\', '   \\|'],
        )
      }
    }
    stamp(plant.x - 2, height - 2, ['_/|\\_'])
  }
  stamp(74, 10, ['     .', ' ><(((o>'])
  stamp(94, 17, ['<o)))><'])
  for (let x = 0; x < width; x++) {
    if ((x * 7) % 13 < 3) put(x, height - 1, '.')
    else if ((x * 3) % 11 === 0) put(x, height - 1, '_')
  }
  return field.map((row) => row.join('')).join('\n')
}

const art = computed(() => (props.kind === 'kelp' ? kelp() : water()))
</script>

<template>
  <div class="ascii-nature" :class="`ascii-${kind}`" aria-hidden="true">
    <pre>{{ art }}</pre>
  </div>
</template>

<style scoped>
.ascii-nature {
  pointer-events: none;
  user-select: none;
}
pre {
  margin: 0;
  font: 400 11px / 11px var(--mono);
  letter-spacing: 0;
  white-space: pre;
}
.ascii-water {
  position: absolute;
  color: var(--green);
  opacity: 0.16;
  transform: rotate(-7deg);
  mask-image: radial-gradient(ellipse at center, #000 20%, transparent 72%);
}
.ascii-water pre {
  font-size: 13px;
  line-height: 14px;
}
.ascii-kelp {
  display: flex;
  justify-content: center;
  overflow: hidden;
  color: #6d7d5e;
}
.ascii-kelp pre {
  flex-shrink: 0;
}
@media (max-width: 760px) {
  .ascii-kelp {
    justify-content: flex-start;
  }
  .ascii-kelp pre {
    font-size: 10px;
    line-height: 10px;
    transform: translateX(-70px);
  }
}
</style>
