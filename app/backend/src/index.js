import { Logger } from '@aws-lambda-powertools/logger'

const logger = new Logger({ serviceName: 'backend' })

export const handler = async (event, context) => {
  logger.addContext(context)
  logger.info('hello world', { path: event.rawPath })

  return { statusCode: 200, body: JSON.stringify({ message: 'Hello World' }) }
}
