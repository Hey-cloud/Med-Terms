const KEY = 'medterms.state.v1'

export function loadState() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) {
      return {
        version: '1',
        cardsProgress: {},
        user: { xp: 0, streak: 0, lastActive: null },
        settings: { dailyGoal: 20, autoSpeak: false, studyMode: 'learn' }
      }
    }
    return JSON.parse(raw)
  } catch (e) {
    console.error('load state failed', e)
    return {}
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch (e) {
    console.error('save state failed', e)
  }
}
