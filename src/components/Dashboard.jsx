import React from 'react'
import { formatDistanceToNow } from 'date-fns'

export default function Dashboard({ cards = [], state }) {
  const dueCount = cards.filter(c => {
    const p = state?.cardsProgress?.[c.id]
    if (!p) return true
    return new Date(p.due) <= new Date()
  }).length
  const xp = state?.user?.xp || 0
  const streak = state?.user?.streak || 0
  return (
    <div className="bg-white p-4 rounded shadow mb-4 flex justify-between items-center">
      <div>
        <div className="text-sm text-slate-500">Due</div>
        <div className="text-xl font-semibold">{dueCount}</div>
      </div>
      <div>
        <div className="text-sm text-slate-500">XP</div>
        <div className="text-xl font-semibold">{xp}</div>
      </div>
      <div>
        <div className="text-sm text-slate-500">Streak</div>
        <div className="text-xl font-semibold">{streak}d</div>
      </div>
      <div>
        <div className="text-sm text-slate-500">Last active</div>
        <div className="text-sm">{state?.user?.lastActive ? formatDistanceToNow(new Date(state.user.lastActive)) + ' ago' : 'never'}</div>
      </div>
    </div>
  )
}
