import { Camera, Medal, Target, Trophy } from 'lucide-react'
import { useEffect, useState } from 'react'
import { api } from '../api'

const MEDALS = ['text-amber-500', 'text-zinc-400', 'text-orange-700']

export default function Ranking() {
  const [quizzes, setQuizzes] = useState([])
  const [quizId, setQuizId] = useState('')
  const [ranking, setRanking] = useState(null)

  useEffect(() => {
    api('/quizzes').then(setQuizzes)
  }, [])

  useEffect(() => {
    setRanking(null)
    api(quizId ? `/ranking?quiz=${quizId}` : '/ranking').then(setRanking)
  }, [quizId])

  const tabs = [{ id: '', title: 'Geral' }, ...quizzes.map((quiz) => ({ id: quiz.id, title: `Encontro ${Number(quiz.id)}` }))]
  const leader = ranking?.[0]?.points || 1
  const position = ranking ? ranking.findIndex((row) => row.me) + 1 : 0
  const me = ranking?.[position - 1]

  return (
    <>
      <h1 className="text-3xl font-semibold tracking-tight">Ranking</h1>
      <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-zinc-500">
        <span className="flex items-center gap-1.5"><Target className="size-4" />1 ponto por acerto</span>
        <span className="flex items-center gap-1.5"><Camera className="size-4" />2 pontos pela foto no mural</span>
      </div>

      <div className="mt-8 flex gap-2" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={quizId === tab.id}
            onClick={() => setQuizId(tab.id)}
            className={`rounded-full px-4 py-1.5 text-sm transition ${quizId === tab.id ? 'bg-primary text-white' : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900'}`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {me && (
        <section className="mt-6 flex items-center gap-4 rounded-xl border border-primary/20 bg-primary/5 p-5">
          <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-primary text-white">
            <Trophy className="size-5" />
          </span>
          <div>
            <p className="font-semibold">Você está em {position}º lugar com {me.points} pontos</p>
            <p className="text-sm text-zinc-500">
              {position === 1 ? 'Ninguém está na sua frente. Segure a liderança.' : `Faltam ${ranking[0].points - me.points} pontos para o 1º lugar.`}
            </p>
          </div>
        </section>
      )}

      {ranking === null ? (
        <ul className="mt-6 space-y-3" aria-hidden>
          {[0, 1, 2].map((i) => <li key={i} className="h-14 animate-pulse rounded-lg bg-zinc-100" />)}
        </ul>
      ) : ranking.length === 0 ? (
        <div className="mt-6 flex flex-col items-center rounded-xl border border-dashed border-zinc-300 px-6 py-14 text-center">
          <Trophy className="size-8 text-zinc-400" />
          <p className="mt-3 font-semibold">Ninguém pontuou ainda</p>
          <p className="mt-1 text-sm text-zinc-500">Responda o quiz para aparecer aqui.</p>
        </div>
      ) : (
        <ol key={quizId} className="mt-6 divide-y divide-zinc-200 border-y border-zinc-200">
          {ranking.map((row, i) => (
            <li
              key={i}
              style={{ transitionDelay: `${i * 50}ms` }}
              className={`flex items-center gap-4 px-3 py-4 transition duration-500 ease-out starting:translate-y-2 starting:opacity-0 motion-reduce:transition-none ${row.me ? 'bg-primary/5' : ''}`}
            >
              <span className="grid w-6 place-items-center text-sm text-zinc-500">
                {i < 3 ? <Medal className={`size-5 ${MEDALS[i]}`} aria-label={`${i + 1}º`} /> : i + 1}
              </span>
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary/10 text-sm font-semibold text-primary uppercase">
                {row.name[0]}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm">
                  {row.name}
                  {row.me && <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">você</span>}
                </p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-zinc-100">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${(row.points / leader) * 100}%` }} />
                </div>
              </div>
              <span className="w-16 text-right font-semibold">{row.points} pts</span>
            </li>
          ))}
        </ol>
      )}
    </>
  )
}
