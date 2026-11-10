import { useEffect, useState } from 'react'
import { api } from '../api'

export default function Ranking() {
  const [quizzes, setQuizzes] = useState([])
  const [quizId, setQuizId] = useState('')
  const [ranking, setRanking] = useState([])

  useEffect(() => {
    api('/quizzes').then(setQuizzes)
  }, [])

  useEffect(() => {
    api(quizId ? `/ranking?quiz=${quizId}` : '/ranking').then(setRanking)
  }, [quizId])

  const tabs = [{ id: '', title: 'Geral' }, ...quizzes.map((quiz) => ({ id: quiz.id, title: `Encontro ${Number(quiz.id)}` }))]

  return (
    <>
      <h1 className="text-2xl font-semibold">Ranking</h1>
      <p className="mt-1 text-sm text-zinc-500">Acertos mais bônus do mural.</p>

      <div className="mt-6 flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setQuizId(tab.id)}
            className={`rounded-full px-3 py-1.5 text-sm ${quizId === tab.id ? 'bg-primary text-white' : 'text-zinc-500 hover:bg-zinc-100'}`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {ranking.length === 0 ? (
        <p className="mt-8 text-sm text-zinc-500">Ninguém pontuou ainda.</p>
      ) : (
        <ol className="mt-6 divide-y divide-zinc-200 border-y border-zinc-200">
          {ranking.map((row, i) => (
            <li key={i} className={`flex items-center gap-4 px-2 py-3 text-sm ${row.me ? 'bg-primary/5' : ''}`}>
              <span className="w-6 text-zinc-500">{i + 1}</span>
              <span className="flex-1">{row.name}{row.me && <span className="text-zinc-500"> (você)</span>}</span>
              <span className="font-semibold">{row.points} pts</span>
            </li>
          ))}
        </ol>
      )}
    </>
  )
}
