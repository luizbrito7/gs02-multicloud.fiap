import { useState } from 'react'
import { Link } from 'react-router'

export function Button({ variant = 'primary', loading = false, className = '', children, disabled, ...props }) {
  const styles = {
    primary: 'bg-primary text-white hover:bg-primary-hover',
    secondary: 'border border-zinc-300 text-zinc-700 hover:bg-zinc-50',
  }
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 ${styles[variant]} ${className}`}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading && <Spinner />}
      {children}
    </button>
  )
}

function Spinner() {
  return (
    <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
      <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

export function Field({ label, type, ...props }) {
  const [visible, setVisible] = useState(false)
  const isPassword = type === 'password'

  return (
    <label className="block">
      <span className="text-sm text-zinc-700">{label}</span>
      <span className="relative mt-1.5 block">
        <input
          className={`w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 ${isPassword ? 'pr-10' : ''}`}
          type={isPassword && visible ? 'text' : type}
          required
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setVisible(!visible)}
            aria-label={visible ? 'Ocultar senha' : 'Mostrar senha'}
            className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-zinc-400 hover:text-zinc-700"
          >
            <EyeIcon off={visible} />
          </button>
        )}
      </span>
    </label>
  )
}

function EyeIcon({ off }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
      {off && <path d="m3 3 18 18" />}
    </svg>
  )
}

export function TextLink(props) {
  return <Link className="text-sm font-semibold text-primary hover:text-primary-hover" {...props} />
}

// Entra com fade + slide via @starting-style (variant `starting:` do Tailwind v4).
export function ErrorMessage({ children }) {
  if (!children) return null
  // TODO(human): retornar o alerta estruturado (role="alert", ícone, fundo e borda, animação de entrada)
  return <p className="text-sm text-red-600">{children}</p>
}
