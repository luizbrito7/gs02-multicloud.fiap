import { useState } from 'react'
import { Link } from 'react-router'

export function Button({ variant = 'primary', className = '', ...props }) {
  const styles = {
    primary: 'bg-primary text-white hover:bg-primary-hover',
    secondary: 'border border-zinc-300 text-zinc-700 hover:bg-zinc-50',
  }
  return (
    <button
      className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${styles[variant]} ${className}`}
      {...props}
    />
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

export function ErrorMessage({ children }) {
  return children ? <p className="text-sm text-red-600">{children}</p> : null
}
