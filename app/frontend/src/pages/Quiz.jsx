import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { api } from '../api'
import { Button, ErrorMessage, TextLink } from '../ui'

export default function Quiz() {
  const { id } = useParams()
  const [quiz, setQuiz] = useState()
  const [answers, setAnswers] = useState([])
  const [step, setStep] = useState(0)
  const [error, setError] = useState()

  useEffect(() => {
    api(`/quizzes/${id}`).then(setQuiz)
  }, [id])

  if (!quiz) return null

  if (quiz.score !== null) {
    return (
      <>
        <h1 className="text-2xl font-semibold">{quiz.title}</h1>
        <p className="mt-6 text-4xl font-semibold text-primary">{quiz.score} de {quiz.total}</p>
        <p className="mt-1 text-sm text-zinc-500">acertos</p>
        <div className="mt-8 flex gap-6 text-sm">
          <TextLink to={`/quiz/${id}/mural`}>Enviar foto para o mural</TextLink>
          <TextLink to="/ranking">Ver ranking</TextLink>
        </div>
      </>
    )
  }

  const question = quiz.questions[step]
  const isLast = step === quiz.total - 1

  async function submit() {
    try {
      const { score } = await api(`/quizzes/${id}/answers`, { method: 'POST', body: { answers } })
      setQuiz({ ...quiz, score })
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <>
      <p className="text-sm text-zinc-500">Pergunta {step + 1} de {quiz.total}</p>
      <div className="mt-2 h-1 rounded-full bg-zinc-100">
        <div className="h-1 rounded-full bg-primary transition-all" style={{ width: `${((step + 1) / quiz.total) * 100}%` }} />
      </div>

      <h1 className="mt-8 text-xl font-semibold">{question.text}</h1>

      <div className="mt-6 space-y-3">
        {question.options.map((option, i) => (
          <button
            key={option}
            onClick={() => setAnswers(answers.toSpliced(step, 1, i))}
            className={`w-full rounded-lg border px-4 py-3 text-left text-sm transition-colors ${
              answers[step] === i ? 'border-primary bg-primary/5 text-zinc-900' : 'border-zinc-300 text-zinc-700 hover:border-zinc-400'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="mt-8 flex items-center gap-3">
        {step > 0 && <Button variant="secondary" onClick={() => setStep(step - 1)}>Voltar</Button>}
        <Button
          className="ml-auto"
          disabled={answers[step] === undefined}
          onClick={isLast ? submit : () => setStep(step + 1)}
        >
          {isLast ? 'Enviar respostas' : 'Próxima'}
        </Button>
      </div>
      <div className="mt-4"><ErrorMessage>{error}</ErrorMessage></div>
    </>
  )
}
