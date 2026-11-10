import { useId, useState } from 'react'
import { Toaster as Sonner } from 'sonner'
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

export function Field({ label, type, hint, ...props }) {
  const [visible, setVisible] = useState(false)
  const hintId = useId()
  const isPassword = type === 'password'

  return (
    <label className="block">
      <span className="flex items-center gap-1.5 text-sm text-zinc-700">
        {label}
        {hint && <Hint id={hintId}>{hint}</Hint>}
      </span>
      <span className="relative mt-1.5 block">
        <input
          className={`w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 ${isPassword ? 'pr-10' : ''}`}
          type={isPassword && visible ? 'text' : type}
          aria-describedby={hint ? hintId : undefined}
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

// Ícone de ajuda com tooltip no hover ou no foco do teclado.
function Hint({ id, children }) {
  return (
    <span tabIndex={0} className="group relative text-zinc-400 outline-none hover:text-zinc-600 focus-visible:text-zinc-600">
      <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4M12 8h.01" />
      </svg>
      <span id={id} role="tooltip" className="invisible absolute bottom-full left-1/2 z-10 mb-2 w-56 -translate-x-1/2 rounded-lg bg-zinc-900 px-3 py-2 text-xs text-white opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-visible:visible group-focus-visible:opacity-100">
        {children}
      </span>
    </span>
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

// Toast clean: card branco e ícone colorido.
const toastIcon = (path, color) => (
  <svg className={`size-5 ${color}`} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d={path} />
  </svg>
)

export function Toaster() {
  return (
    <Sonner
      position="top-right"
      icons={{
        success: toastIcon('M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.7 7.7a1 1 0 0 0-1.4-1.4L10.5 13l-1.8-1.7a1 1 0 0 0-1.4 1.4l2.5 2.5a1 1 0 0 0 1.4 0l5.5-5.5Z', 'text-emerald-500'),
        error: toastIcon('M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm3.7 6.3a1 1 0 0 0-1.4 0L12 10.6 9.7 8.3a1 1 0 0 0-1.4 1.4l2.3 2.3-2.3 2.3a1 1 0 1 0 1.4 1.4l2.3-2.3 2.3 2.3a1 1 0 0 0 1.4-1.4L13.4 12l2.3-2.3a1 1 0 0 0 0-1.4Z', 'text-red-500'),
        info: toastIcon('M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 8a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1Zm0-4a1.25 1.25 0 1 1 0 2.5A1.25 1.25 0 0 1 12 6Z', 'text-blue-500'),
      }}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: 'flex w-full items-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3.5 font-sans shadow-sm',
          title: 'text-sm font-semibold text-zinc-800',
          description: 'mt-0.5 text-sm text-zinc-500',
        },
      }}
    />
  )
}
