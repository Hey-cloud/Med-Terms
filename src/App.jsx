import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import DeckList from './components/DeckList'
import DeckView from './components/DeckView'
import Dashboard from './components/Dashboard'
import Settings from './components/Settings'
import AdminTools from './components/AdminTools'
import { fetchCards } from './lib/api'
import { loadState, saveState } from './lib/storage'

export default function App() {
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedDeck, setSelectedDeck] = useState('all')
  const [state, setState] = useState(() => loadState())

  useEffect(() => {
    let mounted = true
    async function load() {
      setLoading(true)
      try {
        const data = await fetchCards()
        if (!mounted) return
        setCards(data)
      } catch (err) {
        console.error('Failed to load cards', err)
      } finally {
        setLoading(false)
      }
    }
    load()
    return () => (mounted = false)
  }, [])

  useEffect(() => saveState(state), [state])

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="p-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <aside className="md:col-span-1">
            <DeckList
              cards={cards}
              onSelectDeck={setSelectedDeck}
              selectedDeck={selectedDeck}
              refresh={() => window.location.reload()}
            />
            <Settings state={state} setState={setState} />
            <AdminTools cards={cards} setCards={setCards} setState={setState} />
          </aside>
          <section className="md:col-span-2">
            <Dashboard cards={cards} state={state} setState={setState} />
            <DeckView
              cards={cards}
              selectedDeck={selectedDeck}
              state={state}
              setState={setState}
            />
          </section>
        </div>
      </main>
    </div>
  )
}
