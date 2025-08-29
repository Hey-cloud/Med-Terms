import React, { useMemo, useState } from 'react'
import Flashcard from './Flashcard'
import QuizEngine from './QuizEngine'
import RapidFire from './RapidFire'
import { interleave } from '../lib/interleave'

export default function DeckView({ cards = [], selectedDeck, state, setState }) {
  const [mode, setMode] = useState('learn') // learn, test, rapid
  const filtered = useMemo(() => {
    if (selectedDeck === 'all') return cards
    return cards.filter(c => (c.category || 'uncategorized') === selectedDeck)
  }, [cards, selectedDeck])

  const queue = useMemo(() => interleave(filtered, 500), [filtered])

  return (
    <div className="mt-4 space-y-4">
      <div className="flex gap-2">
        <button onClick={() => setMode('learn')} className={mode==='learn'?'btn-active':'btn'}>Learn</button>
        <button onClick={() => setMode('test')} className={mode==='test'?'btn-active':'btn'}>Test</button>
        <button onClick={() => setMode('rapid')} className={mode==='rapid'?'btn-active':'btn'}>Rapid Fire</button>
      </div>

      {mode === 'learn' && <Flashcard queue={queue} state={state} setState={setState} />}
      {mode === 'test' && <QuizEngine queue={queue} state={state} setState={setState} />}
      {mode === 'rapid' && <RapidFire queue={queue} state={state} setState={setState} />}
    </div>
  )
}
