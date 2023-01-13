class QuizzesRepository {
  //* 의존성 주입
  constructor(QuizzesModel, MembersModel, QuizDislikesModel, QuizLikesModel) {
    //* Model
    this.quizzesModel = QuizzesModel;
    this.membersModel = MembersModel;
    this.quizDislikesModel = QuizDislikesModel;
    this.quizLikesModel = QuizLikesModel;
  }

  //* nickname을 얻기 위해 사용.
  //* mId를 이용하여 Member의 정보를 받아오기.
  findMemberBymId = async (mId) => {
    //* Member의 정보를 받아 오기 때문에 membersModel을 사용.
    const memberData = await this.membersModel.findByPk(mId);
    return memberData;
  };

  //* 퀴즈 데이터 DB에 생성하기.
  createQuiz = async (mId, title, content, answer) => {
    const createQuizData = await this.quizzesModel.create({
      mId,
      title,
      content,
      answer,
    });

    return createQuizData;
  };

  //* Like, Dislike 구현후 수정하여 게시글의 Like의 개수와 DisLike의 개수를 받아올 것.
  getAllQuiz = async () => {
    const allQuizData = await this.quizzesModel.findAll();
    return allQuizData;
  };
}

module.exports = QuizzesRepository;
