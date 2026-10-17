import type { OceanFrame } from '~/composables/useAsciiAnimation'

const fishShape = [
  '             /|          ',
  '       _____/ |___       ',
  '      /           `-.    ',
  '  |\\ /      :    o   \\   ',
  '  | >       :         >  ',
  '  |/ \\      :       _/   ',
  "      `----.  .----'     ",
  '            \\/          ',
]

// Every fish is actual typeset ASCII. Tail and fins undulate independently.
export function drawAsciiFish(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  scale: number,
  direction: number,
  phase: number,
  opacity = 1,
) {
  ctx.save()
  ctx.translate(x, y)
  ctx.scale(scale * direction, scale)
  ctx.globalAlpha *= opacity
  ctx.font = '11px "IBM Plex Mono", monospace'
  fishShape.forEach((line, row) => {
    Array.from(line).forEach((char, column) => {
      if (char === ' ') return
      const tail = Math.max(0, 1 - column / 14)
      const sway = Math.sin(phase * 4.2 - column * 0.3) * (1 + tail * 4)
      const fin = row < 2 || row > 5 ? Math.sin(phase * 3 + column) * 1.4 : 0
      ctx.fillText(char, (column - 12) * 6.5, (row - 4) * 10 + sway + fin)
    })
  })
  ctx.restore()
}

export function drawWater(frame: OceanFrame, dark = false) {
  const { ctx, width, height, time, pointer } = frame
  ctx.fillStyle = dark ? '#d9e2bb' : '#52694c'
  ctx.font = '12px "IBM Plex Mono", monospace'
  const spacing = width < 500 ? 15 : 13
  for (let y = 8; y < height; y += 16) {
    for (let x = 4; x < width; x += spacing) {
      const distance = Math.hypot(x - pointer.x, y - pointer.y)
      const disturbance =
        Math.exp(-distance / 140) *
        Math.sin(distance / 14 - time * 4) *
        pointer.strength
      const flow =
        Math.sin(
          x * 0.027 + time * 0.8 + Math.sin(y * 0.018 + time * 0.35) * 2,
        ) +
        Math.cos(y * 0.047 - time * 0.7 + x * 0.006) * 0.75 +
        disturbance * 1.8
      const crest = Math.abs(flow)
      if (!dark && crest > 0.6) continue
      ctx.globalAlpha = dark
        ? 0.08 + (flow + 2) * 0.065
        : 0.16 + (0.6 - crest) * 0.6
      const symbol = dark
        ? '.:~+*'[Math.max(0, Math.min(4, Math.floor((flow + 1.75) * 1.25)))]!
        : crest < 0.16
          ? '~'
          : crest < 0.36
            ? '-'
            : '.'
      ctx.fillText(
        symbol,
        x + Math.sin(time * 0.5 + y * 0.03) * 3,
        y + Math.sin(x * 0.02 + time) * 3 + disturbance * 8,
      )
    }
  }
  ctx.globalAlpha = 1
}

export function drawBubbles(frame: OceanFrame, count: number, opacity: number) {
  const { ctx, width, height, time } = frame
  ctx.font = '10px "IBM Plex Mono", monospace'
  for (let i = 0; i < count; i++) {
    const progress =
      ((time * (7 + (i % 4) * 2) + i * 67) % (height + 30)) / (height + 30)
    const x =
      ((i * 173 + 41) % width) +
      Math.sin(time * 0.6 + i * 2 + progress * 8) * 12
    ctx.globalAlpha = opacity * Math.sin(progress * Math.PI)
    ctx.fillText(
      i % 3 === 0 ? 'o' : '.',
      x,
      height + 15 - progress * (height + 30),
    )
  }
  ctx.globalAlpha = 1
}

export function drawKelp(frame: OceanFrame) {
  const { ctx, width, height, time, pointer } = frame
  const world = Math.max(width, 730)
  const offset = width < 730 ? -75 : (width - world) / 2
  const bottom = height - 16
  const plants = [
    [0.035, 0.38, 1],
    [0.12, 0.67, 3],
    [0.21, 0.9, 2],
    [0.3, 0.5, 4],
    [0.69, 0.63, 2],
    [0.78, 0.95, 5],
    [0.88, 0.76, 1],
    [0.97, 0.42, 3],
  ]
  ctx.font = '12px "IBM Plex Mono", monospace'
  for (const [position, tall, seed] of plants) {
    const anchor = position! * world + offset
    const length = (height - 35) * tall!
    const steps = Math.floor(length / 10)
    const attraction =
      Math.exp(-Math.abs(anchor - pointer.x) / 130) * pointer.strength
    const stem = (step: number) => {
      const fraction = step / steps
      return (
        anchor +
        fraction ** 1.6 *
          (Math.sin(time * 0.95 - fraction * 2.4 + seed!) * 20 +
            Math.sin(time * 0.43 + seed!) * 11 +
            attraction * Math.sin(time * 2.4 + seed!) * 30)
      )
    }
    ctx.fillStyle = seed! % 2 ? '#5f7756' : '#81916b'
    ctx.globalAlpha = 0.7 + (seed! % 3) * 0.1
    for (let step = 0; step <= steps; step++) {
      const x = stem(step)
      const y = bottom - step * 10
      const direction = stem(step + 1) - x
      ctx.fillText(
        step === steps
          ? '.'
          : Math.abs(direction) < 0.9
            ? '|'
            : direction > 0
              ? '/'
              : '\\',
        x,
        y,
      )
      if (step > 2 && step < steps - 1 && step % 3 === seed! % 3) {
        const side = (Math.floor(step / 3) + seed!) % 2 ? 1 : -1
        const curl = Math.sin(time * 1.35 - step * 0.24 + seed!)
        ctx.save()
        ctx.translate(x + 3, y)
        ctx.rotate(side * (0.22 + curl * 0.14))
        for (let leaf = 0; leaf < 4; leaf++) {
          ctx.fillText(
            side > 0 ? '/' : '\\',
            side * (5 + leaf * 4),
            -leaf * 5 + curl * leaf,
          )
          if (leaf > 1)
            ctx.fillText(
              side > 0 ? ')' : '(',
              side * (10 + leaf * 4),
              -leaf * 5 - 4 + curl * leaf,
            )
        }
        ctx.restore()
      }
    }
    ctx.fillText('_/|\\_', anchor - 12, bottom + 7)
  }
  ctx.fillStyle = '#71845c'
  for (let x = 0; x < width; x += 14) {
    ctx.globalAlpha = 0.22 + Math.sin(x * 0.09) * 0.12
    ctx.fillText(x % 42 === 0 ? '_' : '.', x, height - 4)
  }
  ctx.globalAlpha = 1
  ctx.fillStyle = '#587052'
  for (let i = 0; i < 3; i++) {
    const direction = i === 1 ? -1 : 1
    const progress =
      ((time * (18 + i * 7) + width * (0.35 + i * 0.24)) % (width + 220)) - 110
    drawAsciiFish(
      ctx,
      direction > 0 ? progress : width - progress,
      height * (0.22 + i * 0.21) + Math.sin(time * 0.7 + i) * 14,
      i === 1 ? 0.48 : 0.35,
      direction,
      time + i,
      0.66,
    )
  }
  drawBubbles(frame, 13, 0.42)
}

export function drawOpenWater(frame: OceanFrame) {
  const { ctx, width, height, time, pointer } = frame
  ctx.fillStyle = '#698061'
  for (let i = 0; i < 5; i++) {
    const direction = i % 2 ? -1 : 1
    const progress =
      ((time * (18 + i * 6) + width * (0.13 + i * 0.22)) % (width + 300)) - 150
    let x = direction > 0 ? progress : width - progress
    let y = height * (0.17 + (i % 4) * 0.2) + Math.sin(time * 0.28 + i * 2) * 30
    const near =
      Math.exp(-Math.hypot(x - pointer.x, y - pointer.y) / 150) *
      pointer.strength
    x += direction * near * 22
    y += (y > pointer.y ? 1 : -1) * near * 40
    ctx.globalAlpha = 1
    drawAsciiFish(
      ctx,
      x,
      y,
      i % 3 === 0 ? 0.85 : 0.47,
      direction,
      time + i * 3,
      0.3,
    )
    // Small companions follow their own phase and wake rather than one rigid sprite.
    if (i === 2 || i === 4) {
      drawAsciiFish(
        ctx,
        x - direction * 65,
        y + 30 + Math.sin(time + i) * 8,
        0.25,
        direction,
        time + 3,
        0.2,
      )
      drawAsciiFish(
        ctx,
        x - direction * 105,
        y - 20,
        0.19,
        direction,
        time + 5,
        0.17,
      )
    }
    ctx.font = '11px "IBM Plex Mono", monospace'
    for (let wake = 1; wake < 8; wake++) {
      ctx.globalAlpha = 0.1 * (1 - wake / 8)
      ctx.fillText(
        wake % 2 ? '~' : '.',
        x - direction * (85 + wake * 12),
        y + Math.sin(time * 2 - wake) * 5,
      )
    }
  }
  ctx.globalAlpha = 1
  drawBubbles(frame, width < 600 ? 8 : 17, 0.18)
}
