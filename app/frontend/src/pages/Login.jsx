import { useState } from 'react'
import { toast } from 'sonner'
import { useNavigate } from 'react-router'
import { signIn } from '../auth'
import { Button, Field, TextLink } from '../ui'
import AuthLayout from './AuthLayout'

export default function Login() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.target))
    setLoading(true)
    try {
      const confirmed = await signIn(data)
      navigate(confirmed ? '/' : '/confirm', { state: { email: data.email } })
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout title="Entrar" subtitle="Acesse com seu e-mail e senha.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="E-mail" name="email" type="email" autoComplete="email" />
        <Field label="Senha" name="password" type="password" autoComplete="current-password" />
        <Button className="w-full" loading={loading}>Entrar</Button>
      </form>
      <p className="mt-6 text-center text-sm text-zinc-500">
        Ainda não tem conta? <TextLink to="/signup">Cadastre-se</TextLink>
      </p>
    </AuthLayout>
  )
}
