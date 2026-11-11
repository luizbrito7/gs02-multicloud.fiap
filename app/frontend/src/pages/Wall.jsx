import { Camera, ChevronLeft, CircleCheck, ExternalLink, Image as ImageIcon, LoaderCircle, Maximize2, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { Link, useParams } from 'react-router'
import { api } from '../api'
import { currentUser } from '../auth'

export default function Wall() {
  const { id } = useParams()
  const [quiz, setQuiz] = useState(null)
  const [photos, setPhotos] = useState(null)
  const [sending, setSending] = useState(false)
  const [open, setOpen] = useState(null)

  useEffect(() => {
    api(`/quizzes/${id}`).then(setQuiz)
    api(`/quizzes/${id}/wall`).then(setPhotos)
  }, [id])

  async function upload(event) {
    const file = event.target.files[0]
    if (!file) return
    setSending(true)
    try {
      const { url } = await api(`/quizzes/${id}/photo`, { method: 'POST', body: { contentType: file.type } })
      await fetch(url, { method: 'PUT', body: file, headers: { 'Content-Type': file.type } })
      setPhotos(await api(`/quizzes/${id}/wall`))
      toast.success('Foto enviada para o mural.')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setSending(false)
      event.target.value = ''
    }
  }

  const mine = photos?.some((photo) => photo.name === currentUser().email)

  return (
    <>
      <Link to="/" className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-900">
        <ChevronLeft className="size-4" />Encontros
      </Link>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">Mural</h1>
      <p className="mt-2 text-zinc-500">{quiz?.title ?? ' '}</p>

      <section className="mt-8 flex flex-wrap items-center gap-4 rounded-xl border border-zinc-200 p-5">
        <span className={`grid size-11 shrink-0 place-items-center rounded-lg ${mine ? 'bg-emerald-50 text-emerald-600' : 'bg-primary/10 text-primary'}`}>
          {mine ? <CircleCheck className="size-5" /> : <Camera className="size-5" />}
        </span>
        <div className="min-w-48 flex-1">
          <p className="font-semibold">{mine ? 'Sua foto está no mural' : 'Envie sua foto'}</p>
          <p className="text-sm text-zinc-500">
            {mine ? 'Você ganhou 2 pontos no ranking. Pode trocar a foto quando quiser.' : 'Uma foto sobre o tema do encontro vale 2 pontos no ranking.'}
          </p>
        </div>
        <label className="flex cursor-pointer items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-hover active:scale-[0.98] has-disabled:cursor-not-allowed has-disabled:opacity-50">
          {sending ? <LoaderCircle className="size-4 animate-spin" /> : <Camera className="size-4" />}
          {sending ? 'Enviando...' : mine ? 'Trocar foto' : 'Enviar foto'}
          <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={upload} disabled={sending} />
        </label>
      </section>

      <div className="mt-12 flex items-baseline justify-between">
        <h2 className="text-lg font-semibold">Fotos do encontro</h2>
        {photos && <span className="text-sm text-zinc-500">{photos.length} {photos.length === 1 ? 'foto' : 'fotos'}</span>}
      </div>

      {photos === null ? (
        <ul className="mt-4 grid grid-cols-2 gap-5 sm:grid-cols-3" aria-hidden>
          {[0, 1, 2].map((i) => <li key={i} className="aspect-[4/3] animate-pulse rounded-xl bg-zinc-100" />)}
        </ul>
      ) : photos.length === 0 && !sending ? (
        <div className="mt-4 flex flex-col items-center rounded-xl border border-dashed border-zinc-300 px-6 py-14 text-center">
          <ImageIcon className="size-8 text-zinc-400" />
          <p className="mt-3 font-semibold">Nenhuma foto ainda</p>
          <p className="mt-1 text-sm text-zinc-500">Envie a primeira e ganhe 2 pontos.</p>
        </div>
      ) : (
        <ul className="mt-4 grid grid-cols-2 gap-5 sm:grid-cols-3">
          {sending && (
            <li className="grid aspect-[4/3] place-items-center rounded-xl border border-dashed border-primary/40 bg-primary/5 text-primary transition duration-300 starting:scale-95 starting:opacity-0">
              <LoaderCircle className="size-6 animate-spin" />
            </li>
          )}
          {photos.map((photo, i) => (
            <li
              key={photo.url}
              style={{ transitionDelay: `${i * 60}ms` }}
              className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xs transition duration-500 ease-out hover:border-primary/40 starting:translate-y-3 starting:opacity-0 motion-reduce:transition-none"
            >
              <button
                onClick={() => setOpen(photo)}
                className="group relative block w-full overflow-hidden bg-zinc-50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary"
                aria-label={`Ver foto de ${photo.name}`}
              >
                <img src={photo.url} alt="" className="aspect-[4/3] w-full object-contain p-2 transition duration-300 group-hover:scale-[1.03] motion-reduce:transition-none" />
                <span className="absolute right-2 bottom-2 grid size-8 place-items-center rounded-full bg-white/90 text-zinc-700 opacity-0 shadow-sm transition group-hover:opacity-100 group-focus-visible:opacity-100">
                  <Maximize2 className="size-4" />
                </span>
              </button>
              <p className="flex items-center gap-2 truncate border-t border-zinc-200 px-3 py-2.5 text-sm text-zinc-700">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary/10 text-xs font-semibold text-primary uppercase">
                  {photo.name[0]}
                </span>
                {photo.name}
              </p>
            </li>
          ))}
        </ul>
      )}

      <Lightbox photo={open} onClose={() => setOpen(null)} />
    </>
  )
}

// Foto inteira em tela cheia; Esc ou clique fora fecha.
function Lightbox({ photo, onClose }) {
  const ref = useRef(null)

  useEffect(() => {
    if (photo) ref.current.showModal()
    else ref.current.close()
  }, [photo])

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(event) => event.target === ref.current && onClose()}
      className="m-auto max-h-none max-w-none bg-transparent p-4 transition duration-200 backdrop:bg-zinc-950/80 starting:open:scale-95 starting:open:opacity-0 motion-reduce:transition-none"
    >
      {photo && (
        <figure className="flex flex-col items-center gap-3">
          <img src={photo.url} alt={`Foto de ${photo.name}`} className="max-h-[80vh] max-w-[90vw] rounded-lg object-contain" />
          <figcaption className="flex items-center gap-4 text-sm text-white">
            {photo.name}
            <a href={photo.url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-white/70 hover:text-white">
              <ExternalLink className="size-4" />Abrir original
            </a>
          </figcaption>
        </figure>
      )}
      <button onClick={onClose} className="fixed top-4 right-4 grid size-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20" aria-label="Fechar">
        <X className="size-5" />
      </button>
    </dialog>
  )
}
