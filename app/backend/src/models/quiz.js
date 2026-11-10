import { readdirSync, readFileSync } from 'node:fs'

const dir = new URL('../../quizzes/', import.meta.url)
const quizzes = readdirSync(dir)
  .map((file) => JSON.parse(readFileSync(new URL(file, dir))))
  .filter((quiz) => quiz.released)

export const listQuizzes = () => quizzes

export const findQuiz = (id) => quizzes.find((quiz) => quiz.id === id)
