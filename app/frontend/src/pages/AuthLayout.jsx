export default function AuthLayout({ title, subtitle, children }) {
  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-4">
      <p className="text-sm font-semibold text-primary">Quiz DevOps</p>
      <h1 className="mt-6 text-2xl font-semibold">{title}</h1>
      <p className="mt-1 text-sm text-zinc-500">{subtitle}</p>
      <div className="mt-8">{children}</div>
    </main>
  )
}
