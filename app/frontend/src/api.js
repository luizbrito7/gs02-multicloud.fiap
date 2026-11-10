import { getToken } from './auth'

export async function api(path, { method = 'GET', body } = {}) {
  const res = await fetch(import.meta.env.VITE_API_URL + path, {
    method,
    headers: { Authorization: `Bearer ${await getToken()}`, 'Content-Type': 'application/json' },
    body: body && JSON.stringify(body),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message)
  return data
}
