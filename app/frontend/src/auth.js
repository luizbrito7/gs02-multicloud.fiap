// Autenticação local, sem senha validada. Na etapa do Cognito este arquivo passa a usar aws-amplify (SRP).
const read = (key) => JSON.parse(localStorage.getItem(key))

export async function signUp({ name, email }) {
  const users = read('users') ?? {}
  if (users[email]) throw new Error('Este e-mail já está cadastrado.')
  localStorage.setItem('users', JSON.stringify({ ...users, [email]: name }))
}

export async function signIn({ email }) {
  const name = read('users')?.[email]
  if (!name) throw new Error('E-mail ou senha incorretos.')
  localStorage.setItem('session', JSON.stringify({ sub: email, email, name }))
}

export const signOut = () => localStorage.removeItem('session')

export const currentUser = () => read('session')

export const getToken = async () => encodeURIComponent(JSON.stringify(currentUser()))
