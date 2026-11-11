import { Camera, ClipboardList, Image, Medal, Star, Target } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { api } from '../api'
import { currentUser } from '../auth'

export default function Home() {
  const [quizzes, setQuizzes] = useState([])
  const [ranking, setRanking] = useState([])

  useEffect(() => {
    api('/quizzes').then(setQuizzes)
    api('/ranking').then(setRanking)
  }, [])

  const answered = quizzes.filter((quiz) => quiz.score !== null)
  const position = ranking.findIndex((row) => row.me) + 1
  const name = currentUser().email.split('@')[0]

  return (
    <>
      <h1 className="text-3xl font-semibold tracking-tight">Olá, {name}</h1>
      <p className="mt-2 text-zinc-500">Responda o quiz de cada encontro e envie sua foto para o mural.</p>

      <dl className="mt-8 grid grid-cols-3 divide-x divide-zinc-200 rounded-xl border border-zinc-200">
        <Stat icon={ClipboardList} label="Respondidos" value={`${answered.length} de ${quizzes.length}`} />
        <Stat icon={Target} label="Acertos" value={answered.reduce((sum, quiz) => sum + quiz.score, 0)} />
        <Stat icon={Medal} label="Ranking geral" value={position ? `${position}º de ${ranking.length}` : '—'} />
      </dl>

      <h2 className="mt-12 text-lg font-semibold">Encontros</h2>
      <ul className="mt-4 divide-y divide-zinc-200 border-y border-zinc-200">
        {quizzes.map((quiz) => (
          <li key={quiz.id} className="flex items-center gap-4 py-5">
            <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-primary/10 font-semibold text-primary">
              {Number(quiz.id)}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold">{quiz.title}</p>
              <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-zinc-500">
                {quiz.score === null ? <span>{quiz.total} perguntas</span> : <Score score={quiz.score} total={quiz.total} />}
                {quiz.photo && <span className="flex items-center gap-1.5"><Camera className="size-4" />Foto enviada</span>}
              </div>
            </div>
            <Link to={`/quiz/${quiz.id}/wall`} className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-hover">
              <Image className="size-4" />Mural
            </Link>
            {quiz.score === null && (
              <Link to={`/quiz/${quiz.id}`} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-hover">
                Responder
              </Link>
            )}
          </li>
        ))}
      </ul>
    </>
  )
}

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="px-4 py-4 sm:px-5">
      <dt className="flex items-center gap-1.5 text-xs text-zinc-500 sm:text-sm"><Icon className="size-4" />{label}</dt>
      <dd className="mt-1 text-lg font-semibold sm:text-xl">{value}</dd>
    </div>
  )
}

// Uma estrela por pergunta: preenchida = acerto.
function Score({ score, total }) {
  return (
    <span className="flex items-center gap-2" aria-label={`${score} de ${total} acertos`}>
      <span className="flex gap-0.5">
        {Array.from({ length: total }, (_, i) => (
          <Star key={i} className={`size-4 ${i < score ? 'fill-primary text-primary' : 'text-zinc-300'}`} />
        ))}
      </span>
      {score} de {total} acertos
    </span>
  )
}
