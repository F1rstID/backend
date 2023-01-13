const QuizzesRepository = require('../repositories/quizzes.repository');
const { Quiz, Member, QuizDislike, QuizLike } = require('../models');
const { NotFound } = require('../helper/http.exception.helper');
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

  //* FIXME: Like, Dislike 구현후 Map 으로 answer 제외시키기.
  getAllQuizzes = async () => {
    return await this.quizzesRepository.getAllQuizzes();
  };

  //* FIXME: Like, Dislike 구현후 Map 으로 answer 제외시키기.
  getQuiz = async (qId) => {
    return await this.quizzesRepository.getQuiz(qId);
  };

  updateQuiz = async (qId, title, content, answer) => {
    //* FIXME: 로그인 구현후 게시글 수정의 권한체크 추가.
    const updateQuizData = await this.quizzesRepository.updateQuiz(
      qId,
      title,
      content,
      answer
    );

    //* DB에 없는 데이터에 수정 명령을 내린 상황. 404
    //* update의 경우에는 수정된 내용의 개수를 배열로 반환한다.
    //* 1개 수정시 : [ 1 ] 을 반환한다.
    //* 0개 수정시 : [ 0 ] 을 반환한다.
    if (updateQuizData < 1) {
      throw new NotFound('게시글이 정상적으로 수정되지 않았습니다.');
    }
  };

  deleteQuiz = async (qId) => {
    //* FIXME: 로그인 구현후 게시글 삭제의 권한체크 추가.
    const deleteQuizData = await this.quizzesRepository.deleteQuiz(qId);

    //* DB에 없는 데이터에 수정 명령을 내린 상황. 404
    //* delete의 경우에는 수정된 내용의 개수를 배열로 반환한다.
    //* 1개 수정시 : [ 1 ] 을 반환한다.
    //* 0개 수정시 : [ 0 ] 을 반환한다.
    if (deleteQuizData < 1) {
      throw new NotFound('게시글이 정상적으로 삭제되지 않았습니다.');
    }
  };
}

module.exports = QuizzesService;
