const QuizzesRepository = require('../repositories/quizzes.repository');
const { Quiz, Member } = require('../models');
class QuizzesService {
  quizzesRepository = new QuizzesRepository(Quiz, Member);

  createQuiz = async (mId, title, content, answer) => {
    return await this.quizzesRepository.createQuiz(mId, title, content, answer);
  };
}

module.exports = QuizzesService;
