export function interleave(cards, maxCount = 100) {
  const groups = {};
  cards.forEach(c => {
    const k = c.category || 'uncategorized';
    groups[k] = groups[k] || [];
    groups[k].push(c);
  });
  const buckets = Object.values(groups);
  const out = [];
  let i = 0;
  while (out.length < Math.min(maxCount, cards.length)) {
    for (const b of buckets) {
      if (b.length) out.push(b.shift());
      if (out.length >= maxCount) break;
    }
    i++;
    if (i > 1000) break;
  }
  return out;
}
