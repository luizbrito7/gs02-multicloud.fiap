# frontend

SPA do quiz: React + Vite + Tailwind, rotas com React Router.

```bash
npm install
npm run dev   # http://localhost:5173 (precisa do backend rodando)
```

Login pelo Cognito com aws-amplify (`src/auth.js`). Preencha `VITE_USER_POOL_ID` e `VITE_USER_POOL_CLIENT_ID` no `.env.development` com o `terraform output` da pasta `terraform/`.
