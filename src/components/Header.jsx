import React from 'react'

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto p-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">MedTerms — Flashcards & Quiz</h1>
          <p className="text-sm text-slate-500">Study medical terminology with spaced repetition</p>
        </div>
        <nav>
          <a href="#" className="text-sm px-3 py-2 rounded hover:bg-slate-100">Docs</a>
          <a href="#" className="text-sm px-3 py-2 rounded hover:bg-slate-100">Support</a>
        </nav>
      </div>
    </header>
  )
}
