import { fail } from '../errors.js'
import * as entries from '../models/entry.js'
import { listQuizzes } from '../models/quiz.js'

export function list({ user }) {
  return Promise.all(listQuizzes().map(async (quiz) => {
    const entry = await entries.getEntry(quiz.id, user.sub)
    return { id: quiz.id, title: quiz.title, total: quiz.questions.length, score: entry?.score ?? null, photo: Boolean(entry?.photo) }
  }))
}

export async function show({ user, quiz }) {
  const entry = await entries.getEntry(quiz.id, user.sub)
  return {
    id: quiz.id,
    title: quiz.title,
    total: quiz.questions.length,
    score: entry?.score ?? null,
    questions: quiz.questions.map(({ text, options }) => ({ text, options })),
  }
}

export async function answer({ user, quiz, body }) {
  if (!Array.isArray(body.answers) || body.answers.length !== quiz.questions.length) fail(400, 'Responda todas as perguntas.')
  const score = quiz.questions.filter((question, i) => question.answer === body.answers[i]).length
  try {
    await entries.saveScore(quiz.id, user, score)
  } catch (err) {
    if (err.name === 'ConditionalCheckFailedException') fail(409, 'Você já respondeu este quiz.')
    throw err
  }
  return { score, total: quiz.questions.length }
}
