import { useState } from 'react'
import { useNavigate } from 'react-router'
import { signUp } from '../auth'
import { Button, ErrorMessage, Field, TextLink } from '../ui'
import AuthLayout from './AuthLayout'

export default function SignUp() {
  const navigate = useNavigate()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.target))
    setError()
    setLoading(true)
    try {
      await signUp(data)
      navigate('/confirm', { state: { email: data.email } })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout title="Criar conta" subtitle="Seu e-mail aparece no ranking e no mural.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="E-mail" name="email" type="email" autoComplete="email" />
        <Field label="Senha" name="password" type="password" autoComplete="new-password" minLength={8} />
        <p className="text-xs text-zinc-500">Mínimo de 8 caracteres, com letra maiúscula, minúscula, número e símbolo.</p>
        <ErrorMessage>{error}</ErrorMessage>
        <Button className="w-full" loading={loading}>Criar conta</Button>
      </form>
      <p className="mt-6 text-sm text-zinc-500">
        Já tem conta? <TextLink to="/login">Entrar</TextLink>
      </p>
    </AuthLayout>
  )
}
