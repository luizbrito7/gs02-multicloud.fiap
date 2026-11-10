import { useState } from 'react'
import { useNavigate } from 'react-router'
import { signIn } from '../auth'
import { Button, ErrorMessage, Field, TextLink } from '../ui'
import AuthLayout from './AuthLayout'

export default function Login() {
  const navigate = useNavigate()
  const [error, setError] = useState()

  async function handleSubmit(event) {
    event.preventDefault()
    try {
      await signIn(Object.fromEntries(new FormData(event.target)))
      navigate('/')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <AuthLayout title="Entrar" subtitle="Acesse com seu e-mail e senha.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="E-mail" name="email" type="email" autoComplete="email" />
        <Field label="Senha" name="password" type="password" autoComplete="current-password" />
        <ErrorMessage>{error}</ErrorMessage>
        <Button className="w-full">Entrar</Button>
      </form>
      <p className="mt-6 text-sm text-zinc-500">
        Ainda não tem conta? <TextLink to="/cadastro">Cadastre-se</TextLink>
      </p>
    </AuthLayout>
  )
}
