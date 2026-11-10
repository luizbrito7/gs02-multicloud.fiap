import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { api } from '../api'
import { ErrorMessage } from '../ui'

export default function Mural() {
  const { id } = useParams()
  const [photos, setPhotos] = useState([])
  const [sending, setSending] = useState(false)
  const [error, setError] = useState()

  useEffect(() => {
    api(`/quizzes/${id}/mural`).then(setPhotos)
  }, [id])

  async function upload(event) {
    const file = event.target.files[0]
    if (!file) return
    setSending(true)
    setError()
    try {
      const { url } = await api(`/quizzes/${id}/photo`, { method: 'POST', body: { contentType: file.type } })
      await fetch(url, { method: 'PUT', body: file, headers: { 'Content-Type': file.type } })
      setPhotos(await api(`/quizzes/${id}/mural`))
    } catch (err) {
      setError(err.message)
    } finally {
      setSending(false)
      event.target.value = ''
    }
  }

  return (
    <>
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <h1 className="text-2xl font-semibold">Mural</h1>
          <p className="mt-1 text-sm text-zinc-500">Uma foto sobre o tema do encontro vale 2 pontos no ranking.</p>
        </div>
        <label className="cursor-pointer rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover has-disabled:opacity-50">
          {sending ? 'Enviando...' : 'Enviar foto'}
          <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={upload} disabled={sending} />
        </label>
      </div>
      <div className="mt-4"><ErrorMessage>{error}</ErrorMessage></div>

      {photos.length === 0 ? (
        <p className="mt-8 text-sm text-zinc-500">Nenhuma foto ainda.</p>
      ) : (
        <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {photos.map((photo) => (
            <li key={photo.url}>
              <img src={photo.url} alt={`Foto de ${photo.name}`} className="aspect-square w-full rounded-lg object-cover" />
              <p className="mt-2 text-sm text-zinc-700">{photo.name}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
