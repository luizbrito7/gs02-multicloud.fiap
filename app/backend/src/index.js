import { readdirSync, readFileSync } from 'node:fs'
import { Logger } from '@aws-lambda-powertools/logger'
import * as db from './db.js'
import { downloadUrl, uploadUrl } from './storage.js'

const logger = new Logger({ serviceName: 'backend' })
const PHOTO_BONUS = 2

const dir = new URL('../quizzes/', import.meta.url)
const quizzes = readdirSync(dir)
  .map((file) => JSON.parse(readFileSync(new URL(file, dir))))
  .filter((quiz) => quiz.released)

function fail(statusCode, message) {
  throw Object.assign(new Error(message), { statusCode })
}

const routes = {
  'GET /quizzes': ({ user }) =>
    Promise.all(quizzes.map(async (quiz) => {
      const entry = await db.getEntry(quiz.id, user.sub)
      return { id: quiz.id, title: quiz.title, total: quiz.questions.length, score: entry?.score ?? null, photo: Boolean(entry?.photo) }
    })),

  'GET /quizzes/:id': async ({ user, quiz }) => {
    const entry = await db.getEntry(quiz.id, user.sub)
    return {
      id: quiz.id,
      title: quiz.title,
      total: quiz.questions.length,
      score: entry?.score ?? null,
      questions: quiz.questions.map(({ text, options }) => ({ text, options })),
    }
  },

  'POST /quizzes/:id/answers': async ({ user, quiz, body }) => {
    if (!Array.isArray(body.answers) || body.answers.length !== quiz.questions.length) fail(400, 'Responda todas as perguntas.')
    const score = quiz.questions.filter((question, i) => question.answer === body.answers[i]).length
    try {
      await db.saveScore(quiz.id, user, score)
    } catch (err) {
      if (err.name === 'ConditionalCheckFailedException') fail(409, 'Você já respondeu este quiz.')
      throw err
    }
    return { score, total: quiz.questions.length }
  },

  'POST /quizzes/:id/photo': async ({ user, quiz, body }) => {
    if (!/^image\/(jpeg|png|webp)$/.test(body.contentType)) fail(400, 'Envie uma imagem JPG, PNG ou WebP.')
    const key = `${quiz.id}/${user.sub}`
    await db.savePhoto(quiz.id, user, key)
    return { url: await uploadUrl(key, body.contentType) }
  },

  'GET /quizzes/:id/mural': async ({ quiz }) => {
    const entries = await db.listEntries(quiz.id)
    return Promise.all(entries.filter((entry) => entry.photo).map(async (entry) => ({ name: entry.name, url: await downloadUrl(entry.photo) })))
  },

  'GET /ranking': async ({ user, query }) => {
    const totals = {}
    for (const { userId, name, score = 0, photo } of await db.listEntries(query.quiz)) {
      totals[userId] ??= { name, points: 0, me: userId === user.sub }
      totals[userId].points += score + (photo ? PHOTO_BONUS : 0)
    }
    return Object.values(totals).sort((a, b) => b.points - a.points)
  },
}

export const handler = async (event, context) => {
  logger.addContext(context)
  const method = event.requestContext.http.method
  const [, resource, id, action] = event.rawPath.split('/')
  const route = routes[`${method} /${[resource, id && ':id', action].filter(Boolean).join('/')}`]
  logger.info('request', { method, path: event.rawPath })

  try {
    if (!route) fail(404, 'Rota não encontrada.')
    const quiz = id && (quizzes.find((q) => q.id === id) ?? fail(404, 'Quiz não encontrado.'))
    const data = await route({
      user: event.requestContext.authorizer.jwt.claims,
      quiz,
      body: event.body ? JSON.parse(event.body) : {},
      query: event.queryStringParameters ?? {},
    })
    return response(200, data)
  } catch (err) {
    if (!err.statusCode) logger.error('unexpected error', err)
    return response(err.statusCode ?? 500, { message: err.statusCode ? err.message : 'Erro interno.' })
  }
}

function response(statusCode, data) {
  return { statusCode, headers: { 'content-type': 'application/json' }, body: JSON.stringify(data) }
}
