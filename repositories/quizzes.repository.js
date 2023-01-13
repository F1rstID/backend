class QuizzesRepository {
  //* 의존성 주입
  constructor(QuizzesModel) {
    //* Model
    this.quizzesModel = QuizzesModel;
  }

  //* 퀴즈 데이터 DB에 생성하기.
  createQuiz = async (memberIndex, title, content, answer) => {

  }
}