import { test } from 'node:test'
import assert from 'node:assert/strict'
import { renderOcean } from '../app/utils/asciiOcean.ts'

const frame = {
  columns: 120,
  rows: 30,
  tick: 0,
  scroll: 0,
  current: 0,
  pointer: { x: -1000, y: -1000, strength: 0 },
}
const kinds = ['water', 'kelp', 'background', 'study']

test('every scene is a rectangular field of printable ASCII characters', () => {
  for (const kind of kinds)
    for (const [columns, rows] of [
      [1, 1],
      [47, 28],
      [120, 30],
      [200, 70],
    ]) {
      const result = renderOcean(kind, { ...frame, columns, rows })
      assert.match(result, /^[\x20-\x7e\n]+$/)
      assert.equal(result.split('\n').length, rows)
      assert.ok(result.split('\n').every((line) => line.length === columns))
    }
})

test('scene rendering is deterministic, including its first SSR frame', () => {
  for (const kind of kinds)
    assert.equal(
      renderOcean(kind, frame),
      renderOcean(kind, structuredClone(frame)),
    )
})

test('water, fish, kelp and tide-pool inhabitants change ASCII frames', () => {
  for (const kind of kinds)
    assert.notEqual(
      renderOcean(kind, frame),
      renderOcean(kind, { ...frame, tick: 12 }),
      kind,
    )
  const before = renderOcean('kelp', frame).split('\n').slice(-6).join('\n')
  const after = renderOcean('kelp', { ...frame, tick: 68 })
    .split('\n')
    .slice(-6)
    .join('\n')
  assert.notEqual(
    before,
    after,
    'Crab and shells have their own changing frames',
  )
})

test('scrolling moves background fish independently of animation time', () => {
  assert.notEqual(
    renderOcean('background', frame),
    renderOcean('background', { ...frame, scroll: 650 }),
  )
  assert.notEqual(
    renderOcean('background', frame),
    renderOcean('background', { ...frame, current: 5 }),
  )
})

test('pointer movement changes the water and tide-pool creatures', () => {
  assert.notEqual(
    renderOcean('water', frame),
    renderOcean('water', { ...frame, pointer: { x: 35, y: 12, strength: 1 } }),
  )
  assert.notEqual(
    renderOcean('kelp', frame),
    renderOcean('kelp', { ...frame, pointer: { x: 45, y: 26, strength: 1 } }),
  )
})
