import React, { useEffect, useState, useRef } from 'react'
import { sm2 } from '../lib/sm2'
import { speak } from '../lib/tts'
import { saveState } from '../lib/storage'

export default function Flashcard({ queue, state, setState }) {
  const [idx, setIdx] = useState(0)
  const [showBack, setShowBack] = useState(false)
  const card = queue[idx] || null
  const inputRef = useRef(null)

  useEffect(() => {
    function onKey(e) {
      if (e.code === 'Space') {
        e.preventDefault()
        setShowBack(s => !s)
      }
      if (['Digit0','Digit1','Digit2','Digit3','Digit4','Digit5'].includes(e.code)) {
        const n = Number(e.code.replace('Digit',''))
        handleGrade(n)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [card])

  function handleGrade(q) {
    if (!card) return
    const updated = sm2(card, q)
    const newState = { ...state }
    newState.cardsProgress = newState.cardsProgress || {}
    newState.cardsProgress[card.id] = {
      interval: updated.interval,
      ef: updated.ef,
      repetitions: updated.repetitions,
      due: updated.due,
      lastReviewed: updated.lastReviewed
    }
    // XP & streaks
    newState.user = newState.user || { xp: 0, streak: 0, lastActive: null }
    newState.user.xp = (newState.user.xp || 0) + Math.max(1, q)
    newState.user.lastActive = new Date().toISOString()
    setState(newState)
    saveState(newState)
    // next card
    setShowBack(false)
    setIdx(i => Math.min(i + 1, queue.length - 1))
  }

  if (!card) return <div className="bg-white p-6 rounded shadow">No cards in queue</div>

  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="flex justify-between">
        <h3 className="text-lg font-semibold">{card.front}</h3>
        <div className="space-x-2">
          <button onClick={() => speak(card.front)} className="text-sm">🔊</button>
          <button onClick={() => speak(card.back)} className="text-sm">🔉 back</button>
        </div>
      </div>
      <p className="text-sm text-slate-500 mt-2">{card.hint}</p>

      <div className="mt-4">
        {!showBack && (
          <div className="py-6 border rounded text-center">
            <button onClick={() => setShowBack(true)} className="px-4 py-2 bg-primary text-white rounded">Flip (Space)</button>
          </div>
        )}

        {showBack && (
          <>
            <div className="py-4">
              <div className="min-h-[80px]">{card.back}</div>
              {card.imageUrl && <img src={card.imageUrl} alt="" className="max-h-48 object-contain mt-2" loading="lazy" />}
              <div className="text-sm mt-2">
                <strong>Mnemonic:</strong> {card.mnemonic}
                <div><strong>Notes:</strong> {card.notes}</div>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              {[0,1,2,3,4,5].map(n => (
                <button key={n} onClick={() => handleGrade(n)} className="px-3 py-1 border rounded text-sm">
                  {n}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
