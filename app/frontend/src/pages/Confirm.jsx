import { useState } from 'react'
import { toast } from 'sonner'
import { useLocation, useNavigate } from 'react-router'
import { confirmSignUp, resendCode } from '../auth'
import { Button, Field, TextLink } from '../ui'
import AuthLayout from './AuthLayout'

export default function Confirm() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const [email, setEmail] = useState(state?.email ?? '')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    const { code } = Object.fromEntries(new FormData(event.target))
    setLoading(true)
    try {
      const signedIn = await confirmSignUp({ email, code })
      navigate(signedIn ? '/' : '/login')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleResend() {
    try {
      await resendCode(email)
      toast.success('Enviamos um novo código.')
    } catch (err) {
      toast.error(err.message)
    }
  }

  return (
    <AuthLayout title="Confirme seu e-mail" subtitle="Digite o código que enviamos para o seu e-mail.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Field label="Código" name="code" inputMode="numeric" autoComplete="one-time-code" />
        <Button className="w-full" loading={loading}>Confirmar</Button>
      </form>
      <p className="mt-6 text-center text-sm text-zinc-500">
        Não recebeu? <button className="font-semibold text-primary hover:text-primary-hover" onClick={handleResend}>Reenviar código</button>
      </p>
      <p className="mt-2 text-center text-sm text-zinc-500">
        <TextLink to="/login">Voltar para o login</TextLink>
      </p>
    </AuthLayout>
  )
}
