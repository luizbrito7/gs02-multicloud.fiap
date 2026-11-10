import { listEntries } from '../models/entry.js'

const PHOTO_BONUS = 2

export async function list({ user, query }) {
  const totals = {}
  for (const { userId, name, score = 0, photo } of await listEntries(query.quiz)) {
    totals[userId] ??= { name, points: 0, me: userId === user.sub }
    totals[userId].points += score + (photo ? PHOTO_BONUS : 0)
  }
  return Object.values(totals).sort((a, b) => b.points - a.points)
}
