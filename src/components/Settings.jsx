import React from 'react'
import { saveState } from '../lib/storage'

export default function Settings({ state, setState }) {
  function toggleAutoSpeak() {
    const s = { ...state, settings: { ...(state.settings || {}), autoSpeak: !(state?.settings?.autoSpeak) } }
    setState(s)
    saveState(s)
  }

  return (
    <div className="bg-white rounded p-4 shadow mt-4">
      <h3 className="font-medium">Settings</h3>
      <div className="mt-3">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={!!state?.settings?.autoSpeak} onChange={toggleAutoSpeak} />
          <span>Auto speak on reveal</span>
        </label>
      </div>
    </div>
  )
}
