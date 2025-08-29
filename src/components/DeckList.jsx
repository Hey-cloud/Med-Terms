import React from 'react'

export default function DeckList({ cards, onSelectDeck, selectedDeck = 'all', refresh }) {
  const categories = [...new Set(cards.map(c => c.category || 'uncategorized'))]
  return (
    <div className="bg-white rounded p-4 shadow">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-medium">Decks</h2>
        <button onClick={refresh} className="text-xs text-blue-600">Refresh</button>
      </div>
      <ul>
        <li>
          <button
            onClick={() => onSelectDeck('all')}
            className={`w-full text-left py-1 ${selectedDeck === 'all' ? 'font-semibold' : ''}`}>
            All ({cards.length})
          </button>
        </li>
        {categories.map(cat => (
          <li key={cat}>
            <button
              onClick={() => onSelectDeck(cat)}
              className={`w-full text-left py-1 ${selectedDeck === cat ? 'font-semibold' : ''}`}>
              {cat} ({cards.filter(c => (c.category || 'uncategorized') === cat).length})
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
