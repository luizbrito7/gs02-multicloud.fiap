import { Amplify } from 'aws-amplify'
import * as cognito from 'aws-amplify/auth'

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_USER_POOL_ID,
      userPoolClientId: import.meta.env.VITE_USER_POOL_CLIENT_ID,
    },
  },
})

const messages = {
  NotAuthorizedException: 'E-mail ou senha incorretos.',
  UsernameExistsException: 'Este e-mail já está cadastrado.',
  InvalidPasswordException: 'A senha precisa de 8 caracteres, com maiúscula, minúscula, número e símbolo.',
  CodeMismatchException: 'Código inválido.',
  ExpiredCodeException: 'Código expirado. Peça um novo.',
  LimitExceededException: 'Muitas tentativas. Tente de novo em alguns minutos.',
}

async function call(fn) {
  try {
    return await fn()
  } catch (err) {
    throw new Error(messages[err.name] ?? err.message)
  }
}

let user = null
// Senha guardada só em memória entre o cadastro e a confirmação, para entrar direto depois do código.
let pendingPassword = null

export async function loadSession() {
  const { tokens } = await cognito.fetchAuthSession()
  user = tokens?.idToken.payload ?? null
}

export const currentUser = () => user

export async function signUp({ email, password }) {
  await call(() => cognito.signUp({ username: email, password, options: { userAttributes: { email } } }))
  pendingPassword = password
}

// Retorna false quando não tem a senha em memória e a pessoa precisa entrar pelo login.
export async function confirmSignUp({ email, code }) {
  await call(() => cognito.confirmSignUp({ username: email, confirmationCode: code }))
  if (!pendingPassword) return false
  await signIn({ email, password: pendingPassword })
  pendingPassword = null
  return true
}

export const resendCode = (email) => call(() => cognito.resendSignUpCode({ username: email }))

// Retorna false quando o e-mail ainda não foi confirmado.
export async function signIn({ email, password }) {
  const { nextStep } = await call(() => cognito.signIn({ username: email, password }))
  if (nextStep.signInStep === 'CONFIRM_SIGN_UP') {
    pendingPassword = password
    return false
  }
  await loadSession()
  return true
}

export async function signOut() {
  await cognito.signOut()
  user = null
}

export async function getToken() {
  const { tokens } = await cognito.fetchAuthSession()
  return tokens.idToken.toString()
}
