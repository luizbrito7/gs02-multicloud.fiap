// Servidor local: simula o API Gateway chamando o handler da Lambda.
import { createServer } from 'node:http'
import { handler } from './index.js'

createServer(async (req, res) => {
  const { statusCode, body } = await handler({ rawPath: req.url }, {})
  res.writeHead(statusCode, { 'Content-Type': 'application/json' }).end(body)
}).listen(3000, () => console.log('http://localhost:3000'))
