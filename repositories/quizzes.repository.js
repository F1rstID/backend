class QuizzesRepository {
  //* 의존성 주입
  constructor(QuizzesModel, MembersModel) {
    //* Model
    this.quizzesModel = QuizzesModel;
    this.membersModel = MembersModel;
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
}

module.exports = QuizzesRepository;
