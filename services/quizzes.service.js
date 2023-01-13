const QuizzesRepository = require('../repositories/quizzes.repository');
const { Quiz, Member, QuizDislike, QuizLike } = require('../models');
class QuizzesService {
  quizzesRepository = new QuizzesRepository(
    Quiz,
    Member,
    QuizDislike,
    QuizLike
  );

  //* 토큰 검증 구현후 mId 파라미터 삭제하기.
  createQuiz = async (mId, title, content, answer) => {
    return await this.quizzesRepository.createQuiz(mId, title, content, answer);
  };

  getAllQuiz = async () => {
    return await this.quizzesRepository.getAllQuiz();
  };
}

module.exports = QuizzesService;
