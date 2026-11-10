# backend

Lambda Node.js 24 do quiz. Uma função, rotas no `src/index.js`, logs em JSON com o Logger do Powertools.

```bash
npm install
docker compose up -d   # DynamoDB local (8000) e S3Mock (9090)
npm run dev            # http://localhost:3000
```

Quizzes ficam em `quizzes/*.json`. Para liberar um quiz no encontro, mude `released` para `true`.
