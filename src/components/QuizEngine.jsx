import React, { useState } from 'react'
import levenshtein from 'levenshtein'
import { sm2 } from '../lib/sm2'
import { saveState } from '../lib/storage'

export default function QuizEngine({ queue, state, setState }) {
  const [idx, setIdx] = useState(0)
  const [input, setInput] = useState('')
  const [feedback, setFeedback] = useState(null)
  const card = queue[idx]

  if (!card) return <div className="bg-white p-6 rounded shadow">No cards</div>

  function check() {
    const a = (card.back || '').toLowerCase().trim()
    const b = input.toLowerCase().trim()
    const dist = new levenshtein(a, b).distance
    const len = Math.max(1, a.length)
    const score = Math.max(0, Math.round((1 - dist / len) * 5))
    setFeedback({ score, dist })
    // apply sm2 with 'score'
    const updated = sm2(card, score)
    const newState = { ...state }
    newState.cardsProgress = newState.cardsProgress || {}
    newState.cardsProgress[card.id] = {
      interval: updated.interval,
      ef: updated.ef,
      repetitions: updated.repetitions,
      due: updated.due,
      lastReviewed: updated.lastReviewed
    }
    newState.user = newState.user || { xp: 0, streak: 0, lastActive: null }
    newState.user.xp = (newState.user.xp || 0) + (score >= 3 ? 5 : 1)
    newState.user.lastActive = new Date().toISOString()
    setState(newState)
    saveState(newState)
  }

  function next() {
    setInput('')
    setFeedback(null)
    setIdx(i => Math.min(i + 1, queue.length - 1))
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="text-lg font-semibold">{card.front}</div>
      <div className="mt-3">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && check()}
          className="w-full border rounded px-3 py-2"
          placeholder="Type your answer and press Enter"
        />
      </div>

      {feedback && (
        <div className="mt-3">
          <div>Score: {feedback.score} (distance {feedback.dist})</div>
          <button onClick={next} className="mt-2 px-3 py-1 rounded bg-primary text-white">Next</button>
        </div>
      )}
    </div>
  )
}
