const QuizzesRepository = require('../repositories/quizzes.repository');
const { Quiz, Member } = require('../models');
class QuizzesService {
  quizzesRepository = new QuizzesRepository(Quiz, Member);

  createQuiz = async (memberIndex, title, content, answer) => {
    return await this.quizzesRepository.createQuiz(
      memberIndex,
      title,
      content,
      answer
    );
  };
}

module.exports = QuizzesService;
