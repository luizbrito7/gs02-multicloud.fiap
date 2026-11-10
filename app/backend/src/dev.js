// Servidor local: faz o papel do API Gateway (CORS + authorizer) e chama o handler da Lambda.
import { createServer } from 'node:http'
import { CreateTableCommand, DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { handler } from './index.js'

await new DynamoDBClient()
  .send(new CreateTableCommand({
    TableName: process.env.TABLE_NAME,
    KeySchema: [{ AttributeName: 'quizId', KeyType: 'HASH' }, { AttributeName: 'userId', KeyType: 'RANGE' }],
    AttributeDefinitions: [{ AttributeName: 'quizId', AttributeType: 'S' }, { AttributeName: 'userId', AttributeType: 'S' }],
    BillingMode: 'PAY_PER_REQUEST',
  }))
  .catch((err) => { if (err.name !== 'ResourceInUseException') throw err })

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, content-type',
  'Access-Control-Allow-Methods': 'GET, POST',
}

createServer(async (req, res) => {
  if (req.method === 'OPTIONS') return res.writeHead(204, cors).end()

  // Local o token é o JSON das claims; na AWS o authorizer do API Gateway valida o JWT do Cognito.
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (!token) return res.writeHead(401, cors).end(JSON.stringify({ message: 'Não autenticado.' }))

  let body = ''
  for await (const chunk of req) body += chunk
  const url = new URL(req.url, 'http://localhost')

  const result = await handler({
    rawPath: url.pathname,
    queryStringParameters: Object.fromEntries(url.searchParams),
    body: body || undefined,
    requestContext: {
      http: { method: req.method },
      authorizer: { jwt: { claims: JSON.parse(decodeURIComponent(token)) } },
    },
  }, {})
  res.writeHead(result.statusCode, { ...cors, ...result.headers }).end(result.body)
}).listen(3000, () => console.log('http://localhost:3000'))
