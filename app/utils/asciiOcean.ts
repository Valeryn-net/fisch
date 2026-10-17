export type OceanKind = 'water' | 'kelp' | 'background' | 'study'
export interface OceanFrame {
  columns: number
  rows: number
  tick: number
  scroll: number
  current: number
  pointer: { x: number; y: number; strength: number }
}
type Sprite = string[]
type Grid = string[][]

// Original flipbooks. Each drawing is replaced on a fixed character grid;
// glyphs are never rotated, stretched, or moved between character cells.
const fish: Sprite[] = [
  [
    '           /|          ',
    '      ____/ |___       ',
    '     / . . . .  \\      ',
    ' \\  / : : : : o  \\     ',
    '  >|  . . . .     >    ',
    ' /  \\ : : : : __/      ',
    "     '---. .--'        ",
    '          \\|           ',
  ],
  [
    '            ,          ',
    '      _____/|___       ',
    '     / : : : :  \\      ',
    '  | / . . . . o  \\     ',
    ' > |  : : : :     )    ',
    '  | \\ . . . . __/      ',
    "     '---._.--'        ",
    '          /            ',
  ],
  [
    '           /|          ',
    '      ____/ |___       ',
    '     / . . . .  \\      ',
    ' /  / : : : : o  \\     ',
    '  >|  . . . .     >    ',
    ' \\  \\ : : : : __/      ',
    "     '---. .--'        ",
    '          /|           ',
  ],
  [
    '            .          ',
    '      _____/|___       ',
    '     / : : : :  \\      ',
    '  | / . . . . o  \\     ',
    ' > |  : : : :     >    ',
    '  | \\ . . . . __/      ',
    "     '---._.--'        ",
    '          \\            ',
  ],
]
const minnows: Sprite[] = [
  ['  _/      ', '><((:o>   ', '  \\_      '],
  ['   ,      ', ' >((.o>   ', '   /      '],
  ['  _/      ', '><((:o)   ', '  \\_      '],
  ['   .      ', ' >((.o>   ', '   \\      '],
]
const jellyfish: Sprite[] = [
  [
    '   .----.   ',
    ' ./ .  . \\. ',
    '(__________)',
    '  ) |  | (  ',
    ' (  :  :  ) ',
    '  ) .  . (  ',
  ],
  [
    '    .--.    ',
    '  ./ .. \\.  ',
    ' (________) ',
    '  ( |  | )  ',
    '   ):  :(   ',
    '  ( .  . )  ',
  ],
  [
    '    .--.    ',
    '   / .. \\   ',
    '  (______)  ',
    '  / :  : \\  ',
    ' (  .  .  ) ',
    '  \\      /  ',
  ],
  [
    '   .----.   ',
    ' ./ .  . \\. ',
    '(__________)',
    '  ( |  | )  ',
    '   ):  :(   ',
    '  ( .  . )  ',
  ],
]
const crab: Sprite[] = [
  [
    ' ()       () ',
    '  \\  o o  /  ',
    '   \\(---)/   ',
    ' _/|_____|\\_ ',
    '  / / \\ \\   ',
  ],
  [
    ' \\/       () ',
    '  \\  o o  /  ',
    '   \\(---)/   ',
    '  /|_____|\\  ',
    ' /_/   \\_\\  ',
  ],
  [
    ' ()       \\/ ',
    '  \\  o o  /  ',
    '   \\(---)/   ',
    ' _/|_____|\\_ ',
    '  / / \\ \\   ',
  ],
  [
    ' ()       () ',
    '  \\  o o  /  ',
    '   \\(---)/   ',
    '  /|_____|\\  ',
    ' /_/   \\_\\  ',
  ],
]
const clam: Sprite[] = [
  ['    __    ', ' .-||||-. ', '(________)', '  \\____/  '],
  ['   .--.   ', ' ./||||\\. ', '(---o----)', '  \\____/  '],
  ['  .----.  ', ' /||||||\\ ', '(   o    )', ' \\______/ '],
  ['   .--.   ', ' ./||||\\. ', '(---o----)', '  \\____/  '],
]
const starfish = [
  '    .    ',
  '   /|    ',
  '._/ |_.  ',
  ' \\ . /   ',
  ' /_/_\\   ',
]
const mirrorMap: Record<string, string> = {
  '/': '\\',
  '\\': '/',
  '(': ')',
  ')': '(',
  '<': '>',
  '>': '<',
  '[': ']',
  ']': '[',
  '{': '}',
  '}': '{',
}

function grid(columns: number, rows: number): Grid {
  return Array.from({ length: rows }, () => Array<string>(columns).fill(' '))
}
function put(field: Grid, x: number, y: number, char: string) {
  x = Math.round(x)
  y = Math.round(y)
  if (y >= 0 && y < field.length && x >= 0 && x < field[0]!.length)
    field[y]![x] = char
}
function stamp(
  field: Grid,
  sprite: Sprite,
  x: number,
  y: number,
  mirrored = false,
  opaque = false,
) {
  const width = Math.max(...sprite.map((line) => line.length))
  sprite.forEach((line, row) => {
    const text = mirrored
      ? Array.from(line.padEnd(width))
          .reverse()
          .map((char) => mirrorMap[char] ?? char)
          .join('')
      : line
    const start = text.search(/\S/)
    const end = text.trimEnd().length
    Array.from(text).forEach((char, column) => {
      if (char !== ' ' || (opaque && column >= start && column < end))
        put(field, x + column, y + row, char)
    })
  })
}
const mod = (value: number, length: number) =>
  ((value % length) + length) % length
function swim(
  field: Grid,
  frame: OceanFrame,
  x: number,
  y: number,
  small = false,
  left = false,
  phase = 0,
) {
  const frames = small ? minnows : fish
  const pose = frames[mod(Math.floor(frame.tick / 2) + phase, frames.length)]!
  stamp(field, pose, x, y, left, true)
}

function water(field: Grid, frame: OceanFrame, dense = false) {
  const { columns, rows, tick, pointer } = frame
  const time = tick / 8
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      const distance = Math.hypot((x - pointer.x) * 0.6, y - pointer.y)
      const ripple =
        Math.sin(distance * 0.65 - time * 3) *
        Math.exp(-distance / 11) *
        pointer.strength
      const wave =
        Math.sin(x * 0.16 - time * 0.7 + Math.sin(y * 0.32 + time * 0.3) * 2) +
        Math.cos(y * 0.61 + x * 0.03 + time * 0.5) * 0.6 +
        ripple
      if (Math.abs(wave) < 0.12) put(field, x, y, '~')
      else if (Math.abs(wave) < 0.25) put(field, x, y, '-')
      else if ((x * 13 + y * 7) % (dense ? 9 : 31) === 0) put(field, x, y, '.')
      else if (dense && Math.abs(wave) < 0.5 && (x + y) % 3 === 0)
        put(field, x, y, ':')
    }
  }
}

function bubbles(field: Grid, frame: OceanFrame, amount: number, seed = 0) {
  for (let i = 0; i < amount; i++) {
    const progress = frame.tick / (i % 2 ? 4 : 6) + i * 17
    const y = frame.rows - 1 - mod(progress, frame.rows + 3)
    const x = mod(
      i * 31 + seed + Math.round(Math.sin(progress / 5) * 2),
      frame.columns,
    )
    put(
      field,
      x,
      y,
      ['.', 'o', 'O', 'o'][mod(Math.floor(progress / 5) + i, 4)]!,
    )
  }
}

function plant(
  field: Grid,
  frame: OceanFrame,
  anchor: number,
  tall: number,
  seed: number,
) {
  const ground = frame.rows - 3
  const pull =
    Math.exp(-Math.abs(frame.pointer.x - anchor) / 13) * frame.pointer.strength
  const stem = (rise: number) =>
    anchor +
    Math.round(
      (rise / tall) ** 1.5 *
        (Math.sin(frame.tick / 9 - rise * 0.22 + seed) * 2.5 +
          Math.sin(frame.tick / 21 + seed) * 1.5 +
          pull * 3),
    )
  for (let rise = 0; rise < tall; rise++) {
    const x = stem(rise)
    const above = stem(rise + 1)
    const y = ground - rise
    put(
      field,
      x,
      y,
      rise === tall - 1 ? ',' : above === x ? '|' : above > x ? '/' : '\\',
    )
    if (rise < 3 || rise >= tall - 2 || (rise + seed) % 3 !== 0) continue
    const phase = mod(Math.floor(frame.tick / 3) + rise + seed, 4)
    const leafFrames = [
      ['   _,', ' _/ /', '/__/ '],
      ['  _', ' / )', '/_/ '],
      ['  ._', ' / /', '/_/ '],
      ['   .', ' _/ )', '/__/ '],
    ]
    const leaf = leafFrames[phase]!
    const right = (Math.floor(rise / 3) + seed) % 2 === 0
    stamp(field, leaf, right ? x + 1 : x - 5, y - 2, !right)
    if (tall > 18 && rise % 6 === seed % 3)
      stamp(
        field,
        [right ? '(\\' : '/)', right ? ' \\)' : '(/'],
        right ? x - 3 : x + 1,
        y - 1,
      )
  }
  stamp(field, ['_/|\\_'], anchor - 2, ground + 1)
}

function seabed(field: Grid, frame: OceanFrame) {
  const { columns, rows, tick } = frame
  const mobile = columns < 80
  const height = rows - 5
  const plants = mobile
    ? [
        [0.02, 0.55, 1],
        [0.18, 0.85, 2],
        [0.86, 0.73, 4],
        [0.98, 0.45, 3],
      ]
    : [
        [0.025, 0.5, 1],
        [0.1, 0.78, 2],
        [0.18, 0.93, 3],
        [0.27, 0.6, 5],
        [0.76, 0.65, 2],
        [0.85, 0.96, 4],
        [0.94, 0.8, 3],
        [0.99, 0.4, 1],
      ]
  for (const [position, size, seed] of plants)
    plant(
      field,
      frame,
      Math.round(position! * columns),
      Math.floor(height * size!),
      seed!,
    )
  // A stable, speckled bed: only its inhabitants animate.
  for (let x = 0; x < columns; x++) {
    if (x % 3 === 0) put(field, x, rows - 1, '.')
    if ((x * 7) % 19 === 0) put(field, x, rows - 2, '_')
  }
  const walk = Math.floor(tick / 4)
  const stroll = Math.round(Math.sin(walk / 12) * (mobile ? 3 : 12))
  const resting = mod(tick, 96) > 72
  const crabX = Math.floor(columns * 0.5) - 6 + stroll
  const greeting =
    Math.hypot(frame.pointer.x - crabX - 6, frame.pointer.y - rows + 4) < 9 &&
    frame.pointer.strength > 0.2
  const crabPose = [
    ...crab[greeting ? 1 + mod(walk, 2) : resting ? 0 : mod(walk, 4)]!,
  ]
  if (mod(tick, 88) === 72) crabPose[1] = crabPose[1]!.replace('o o', '- -')
  stamp(field, crabPose, crabX, rows - 6)
  const opening = mod(Math.floor(tick / 4), 12)
  const nearShell =
    Math.hypot(
      frame.pointer.x - columns * (mobile ? 0.2 : 0.38),
      frame.pointer.y - rows + 4,
    ) < 7 && frame.pointer.strength > 0.2
  const clamPose = nearShell ? 2 : opening < 8 ? 0 : [1, 2, 2, 3][opening - 8]!
  stamp(
    field,
    clam[clamPose]!,
    Math.round(columns * (mobile ? 0.2 : 0.38)) - 4,
    rows - 5,
  )
  stamp(
    field,
    clam[mod(clamPose + 2, 4)]!,
    Math.round(columns * (mobile ? 0.77 : 0.65)) - 5,
    rows - 5,
  )
  if (!mobile) {
    stamp(field, starfish, Math.round(columns * 0.57), rows - 6)
    stamp(
      field,
      ['  _', ' /@\\__', ' \\___/..'],
      Math.round(columns * 0.31) + Math.floor(mod(tick / 24, 6)),
      rows - 4,
    )
  }
  const fishY = mobile ? 7 : 10
  const fishX = mod(tick / 3 + columns * 0.4, columns + 24) - 12
  swim(field, frame, fishX, fishY, true)
  swim(
    field,
    frame,
    columns - mod(tick / 4 + columns * 0.25, columns + 20),
    fishY + 6,
    true,
    true,
    1,
  )
  if (columns > 58) {
    const pulse = mod(Math.floor(tick / 3), jellyfish.length)
    stamp(
      field,
      jellyfish[pulse]!,
      Math.floor(columns * 0.54) + Math.round(Math.sin(tick / 30) * 3),
      2 + Math.round(Math.sin(tick / 14)),
    )
  }
  bubbles(field, frame, mobile ? 4 : 8, 13)
}

function openWater(field: Grid, frame: OceanFrame) {
  const { columns, rows, tick, scroll, current } = frame
  const mobile = columns < 90
  for (let i = 0; i < (mobile ? 4 : 6); i++) {
    const depth = i % 3 === 0 ? 1 : 0.45
    const left = i % 2 === 1
    const travel = tick / (i % 2 ? 5 : 4) + scroll * 0.025 * depth
    const progress = mod(travel + columns * (0.2 + i * 0.21), columns + 35) - 25
    const x = left ? columns - progress : progress
    const y =
      mod(
        rows * (0.13 + (i % 4) * 0.22) -
          scroll * 0.004 * depth +
          Math.round(Math.sin(tick / 32 + i) * 2),
        rows + 10,
      ) - 4
    swim(field, frame, x, y, depth < 1 || mobile, left, i)
    if (i === 2 || i === 4) {
      swim(field, frame, x + (left ? 12 : -13), y + 3, true, left, i + 2)
      swim(field, frame, x + (left ? 21 : -24), y - 2, true, left, i + 1)
    }
    for (let wake = 0; wake < (Math.abs(current) > 1 ? 8 : 4); wake++)
      put(
        field,
        x + (left ? 14 + wake * 2 : -3 - wake * 2),
        y + 2 + mod(tick + wake, 2),
        wake % 2 ? '.' : '~',
      )
  }
  bubbles(field, frame, mobile ? 4 : 8, 4)
}

function study(field: Grid, frame: OceanFrame) {
  water(field, frame, true)
  const x = mod(frame.tick / 3 + frame.columns * 0.5, frame.columns + 28) - 15
  swim(field, frame, x, Math.floor(frame.rows * 0.3), false)
  for (let i = 0; i < 4; i++) {
    const schoolX =
      frame.columns - mod(frame.tick / 4 + i * 12, frame.columns + 24)
    swim(
      field,
      frame,
      schoolX,
      Math.floor(frame.rows * 0.65) + (i % 2) * 3,
      true,
      true,
      i,
    )
  }
  if (frame.columns > 45)
    stamp(
      field,
      jellyfish[mod(Math.floor(frame.tick / 3), 4)]!,
      Math.floor(frame.columns * 0.75),
      2,
    )
  bubbles(field, frame, 8, 5)
}

export function renderOcean(kind: OceanKind, frame: OceanFrame): string {
  const safeFrame = {
    ...frame,
    columns: Math.max(1, Math.floor(frame.columns)),
    rows: Math.max(1, Math.floor(frame.rows)),
  }
  const field = grid(safeFrame.columns, safeFrame.rows)
  if (kind === 'kelp') seabed(field, safeFrame)
  else if (kind === 'water') water(field, safeFrame)
  else if (kind === 'background') openWater(field, safeFrame)
  else study(field, safeFrame)
  return field.map((row) => row.join('')).join('\n')
}
