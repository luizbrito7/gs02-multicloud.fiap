import { useState } from 'react'
import { useNavigate } from 'react-router'
import { signIn, signUp } from '../auth'
import { Button, ErrorMessage, Field, TextLink } from '../ui'
import AuthLayout from './AuthLayout'

export default function SignUp() {
  const navigate = useNavigate()
  const [error, setError] = useState()

  async function handleSubmit(event) {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.target))
    try {
      await signUp(data)
      await signIn(data)
      navigate('/')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <AuthLayout title="Criar conta" subtitle="Seu nome aparece no ranking e no mural.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="Nome" name="name" autoComplete="name" />
        <Field label="E-mail" name="email" type="email" autoComplete="email" />
        <Field label="Senha" name="password" type="password" autoComplete="new-password" minLength={8} />
        <ErrorMessage>{error}</ErrorMessage>
        <Button className="w-full">Criar conta</Button>
      </form>
      <p className="mt-6 text-sm text-zinc-500">
        Já tem conta? <TextLink to="/login">Entrar</TextLink>
      </p>
    </AuthLayout>
  )
}
