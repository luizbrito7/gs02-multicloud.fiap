import { Logger } from '@aws-lambda-powertools/logger'
import { fail } from './errors.js'
import { findQuiz } from './models/quiz.js'
import { routes } from './routes.js'

const logger = new Logger({ serviceName: 'backend' })

export const handler = async (event, context) => {
  logger.addContext(context)
  const method = event.requestContext.http.method
  const [, resource, id, action] = event.rawPath.split('/')
  const route = routes[`${method} /${[resource, id && ':id', action].filter(Boolean).join('/')}`]
  logger.info('request', { method, path: event.rawPath })

  try {
    if (!route) fail(404, 'Rota não encontrada.')
    const data = await route({
      user: event.requestContext.authorizer.jwt.claims,
      quiz: id && (findQuiz(id) ?? fail(404, 'Quiz não encontrado.')),
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
