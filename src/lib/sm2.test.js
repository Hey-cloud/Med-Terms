import { describe, it, expect } from 'vitest'
import { sm2 } from '../lib/sm2'

describe('SM-2 algorithm', () => {
  it('handles failed recall (quality 2) by resetting repetitions', () => {
    const card = { interval: 10, ef: 2.5, repetitions: 3 }
    const out = sm2(card, 2)
    expect(out.repetitions).toBe(0)
    expect(out.interval).toBe(1)
    expect(new Date(out.due).getTime()).toBeGreaterThan(Date.now() - 1000)
  })

  it('increments repetitions on good recall and increases interval', () => {
    const card = { interval: 1, ef: 2.5, repetitions: 0 }
    const out = sm2(card, 5)
    expect(out.repetitions).toBe(1)
    expect(out.interval).toBeGreaterThanOrEqual(1)
    expect(out.ef).toBeGreaterThanOrEqual(1.3)
  })
})
