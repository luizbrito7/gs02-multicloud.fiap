import * as mural from './controllers/mural.js'
import * as quizzes from './controllers/quizzes.js'
import * as ranking from './controllers/ranking.js'

export const routes = {
  'GET /quizzes': quizzes.list,
  'GET /quizzes/:id': quizzes.show,
  'POST /quizzes/:id/answers': quizzes.answer,
  'GET /quizzes/:id/mural': mural.list,
  'POST /quizzes/:id/photo': mural.upload,
  'GET /ranking': ranking.list,
}
