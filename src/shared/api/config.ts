const raw = import.meta.env.VITE_API_URL

export const apiBaseUrl = (typeof raw === 'string' && raw.length > 0
  ? raw
  : 'http://localhost:5001'
).replace(/\/$/, '')
