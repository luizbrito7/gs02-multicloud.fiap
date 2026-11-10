import { useState } from 'react'
import { toast } from 'sonner'
import { useNavigate } from 'react-router'
import { signUp } from '../auth'
import { Button, Field, TextLink } from '../ui'
import AuthLayout from './AuthLayout'

export default function SignUp() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.target))
    setLoading(true)
    try {
      await signUp(data)
      navigate('/confirm', { state: { email: data.email } })
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout title="Criar conta" subtitle="Cadastre-se para participar dos quizzes.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="E-mail" name="email" type="email" autoComplete="email" />
        <Field label="Senha" name="password" type="password" autoComplete="new-password" minLength={8}
          hint="Mínimo de 8 caracteres, com letra maiúscula, minúscula, número e símbolo." />
        <Button className="w-full" loading={loading}>Criar conta</Button>
      </form>
      <p className="mt-6 text-center text-sm text-zinc-500">
        Já tem conta? <TextLink to="/login">Entrar</TextLink>
      </p>
    </AuthLayout>
  )
}
