const QuizzesRepository = require('');
const { Quiz } = require('../models')
class QuizzesService {
  quizzesRepository = new QuizzesRepository(Quiz);

  createQuiz = async () => {

  }

}