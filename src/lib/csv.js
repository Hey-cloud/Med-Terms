// Simple CSV parser & export for import/export admin tools
export function parseCSV(text) {
  const [headerLine, ...rows] = text.trim().split(/\r?\n/);
  const headers = headerLine.split(',').map(h => h.trim());
  return rows.map(r => {
    const cols = r.split(',').map(c => c.trim());
    const obj = {};
    headers.forEach((h, i) => { obj[h] = cols[i] });
    return obj;
  });
}

export function toCSV(arr) {
  if (!arr.length) return ''
  const headers = Object.keys(arr[0])
  const rows = arr.map(r => headers.map(h => JSON.stringify(r[h] === undefined ? '' : String(r[h] || '')).replace(/^"|"$/g,'')).join(','))
  return [headers.join(','), ...rows].join('\n')
}

export function download(filename, content, mime = 'text/csv') {
  const blob = new Blob([content], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}
