import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { api } from '../api'
import { TextLink } from '../ui'

export default function Home() {
  const [quizzes, setQuizzes] = useState([])

  useEffect(() => {
    api('/quizzes').then(setQuizzes)
  }, [])

  return (
    <>
      <h1 className="text-2xl font-semibold">Quizzes</h1>
      <p className="mt-1 text-sm text-zinc-500">Um por encontro. Cada quiz pode ser respondido uma vez.</p>

      <ul className="mt-8 divide-y divide-zinc-200 border-y border-zinc-200">
        {quizzes.map((quiz) => (
          <li key={quiz.id} className="flex items-center gap-4 py-4">
            <div className="flex-1">
              <p className="font-semibold">{quiz.title}</p>
              <p className="text-sm text-zinc-500">
                {quiz.score === null ? `${quiz.total} perguntas` : `${quiz.score} de ${quiz.total} acertos`}
                {quiz.photo && ', foto enviada'}
              </p>
            </div>
            <TextLink to={`/quiz/${quiz.id}/mural`}>Mural</TextLink>
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
