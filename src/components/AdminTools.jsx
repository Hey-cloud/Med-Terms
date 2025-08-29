import React, { useRef } from 'react'
import { parseCSV } from '../lib/csv'

export default function AdminTools({ cards, setCards, setState }) {
  const fileRef = useRef(null)
  function importCSVFile(e) {
    const f = e.target.files[0]
    if (!f) return
    const reader = new FileReader()
    reader.onload = () => {
      const parsed = parseCSV(reader.result)
      setCards(parsed)
      alert('Imported CSV to client memory. Use Admin -> Reinitialize to update SM-2 fields.')
    }
    reader.readAsText(f)
  }

  function reinitSM2() {
    setCards(prev => prev.map(c => ({ ...c, interval: 0, ef: 2.5, repetitions: 0 })))
    setState(s => ({ ...s, cardsProgress: {} }))
    alert('SM-2 fields reinitialized in client memory and local progress cleared.')
  }

  return (
    <div className="bg-white rounded p-4 shadow mt-4">
      <h3 className="font-medium">Admin / Dev tools</h3>
      <div className="mt-3 flex flex-col gap-2">
        <label className="text-sm">Import CSV (client-only)</label>
        <input type="file" accept=".csv" onChange={importCSVFile} ref={fileRef} />
        <button onClick={reinitSM2} className="px-3 py-1 rounded bg-slate-100">Reinitialize SM-2</button>
      </div>
    </div>
  )
}
