import axios from 'axios';
const SHEET_ENDPOINT = import.meta.env.VITE_SHEET_ENDPOINT;
export async function fetchCards() {
  const res = await axios.get(SHEET_ENDPOINT, { timeout: 8000 });
  return res.data.map(row => ({
    ...row,
    id: String(row.id || crypto.randomUUID()),
    interval: Number(row.interval || 0),
    ef: Number(row.ef || 2.5),
    repetitions: Number(row.repetitions || 0),
    due: row.due || new Date().toISOString(),
  }));
}
const CACHE_KEY = 'medterms.cards.v1'
export async function fetchCardsWithCache() {
  try {
    const cached = localStorage.getItem(CACHE_KEY)
    if (cached) {
      // return cached immediately and refresh in background
      const parsed = JSON.parse(cached)
      fetchCards().then(fresh => {
        localStorage.setItem(CACHE_KEY, JSON.stringify(fresh))
      }).catch(()=>{})
      return parsed
    }
    const fresh = await fetchCards()
    localStorage.setItem(CACHE_KEY, JSON.stringify(fresh))
    return fresh
  } catch (err) {
    console.warn('fetch failed, fallback to cache', err)
    const fallback = localStorage.getItem(CACHE_KEY)
    return fallback ? JSON.parse(fallback) : []
  }
}
