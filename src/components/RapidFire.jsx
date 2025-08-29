import React, { useEffect, useState, useRef } from 'react'
import { sm2 } from '../lib/sm2'
import { saveState } from '../lib/storage'

export default function RapidFire({ queue = [], state, setState }) {
  const [timeLeft, setTimeLeft] = useState(30)
  const [idx, setIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => setTimeLeft(t => t - 1), 1000)
    }
    return () => clearInterval(intervalRef.current)
  }, [running])

  useEffect(() => {
    if (timeLeft <= 0) {
      setRunning(false)
      clearInterval(intervalRef.current)
    }
  }, [timeLeft])

  function start() {
    setTimeLeft(30)
    setIdx(0)
    setScore(0)
    setRunning(true)
  }

  function correct() {
    const card = queue[idx]
    if (!card) return
    const updated = sm2(card, 5)
    const newState = { ...state }
    newState.cardsProgress = newState.cardsProgress || {}
    newState.cardsProgress[card.id] = {
      interval: updated.interval,
      ef: updated.ef,
      repetitions: updated.repetitions,
      due: updated.due,
      lastReviewed: updated.lastReviewed
    }
    newState.user = newState.user || { xp: 0, streak: 0 }
    newState.user.xp = (newState.user.xp || 0) + 10
    setState(newState)
    saveState(newState)
    setScore(s => s + 1)
    setIdx(i => (i + 1) % queue.length)
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold">Rapid Fire</h3>
          <p className="text-sm text-slate-500">30s rounds — quick recall</p>
        </div>
        <div className="text-right">
          <div>Time: {timeLeft}s</div>
          <div>Score: {score}</div>
        </div>
      </div>

      <div className="mt-4">
        {!running ? (
          <button onClick={start} className="px-4 py-2 bg-primary text-white rounded">Start 30s</button>
        ) : (
          <>
            <div className="mt-4 text-lg">{queue[idx]?.front || 'No card'}</div>
            <div className="mt-3 flex gap-2">
              <button onClick={correct} className="px-3 py-1 border rounded">Correct</button>
              <button onClick={() => setIdx(i => (i + 1) % queue.length)} className="px-3 py-1 border rounded">Skip</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
