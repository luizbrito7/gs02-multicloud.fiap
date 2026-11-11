import * as wall from './controllers/wall.js'
import * as quizzes from './controllers/quizzes.js'
import * as ranking from './controllers/ranking.js'

export const routes = {
  'GET /quizzes': quizzes.list,
  'GET /quizzes/:id': quizzes.show,
  'POST /quizzes/:id/answers': quizzes.answer,
  'GET /quizzes/:id/wall': wall.list,
  'POST /quizzes/:id/photo': wall.upload,
  'GET /ranking': ranking.list,
}
