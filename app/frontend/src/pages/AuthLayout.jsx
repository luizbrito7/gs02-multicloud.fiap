export default function AuthLayout({ title, subtitle, children }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
      <section className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm transition duration-500 ease-out starting:translate-y-3 starting:opacity-0 motion-reduce:transition-none">
        <p className="text-sm font-semibold text-primary">Quiz DevOps</p>
        <h1 className="mt-6 text-2xl font-semibold">{title}</h1>
        <p className="mt-1 text-sm text-zinc-500">{subtitle}</p>
        <div className="mt-8">{children}</div>
      </section>
    </main>
  )
}
