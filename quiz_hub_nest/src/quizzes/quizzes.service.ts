import { MemberEntity } from 'src/members/members.entity';
import { JwtPayload } from './../common/jwt/jwt.payload';
import { QuizCreateDTO } from './dtos/quiz.create.dto';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { QuizEntity } from './quizzes.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectRepository(QuizEntity)
    private readonly quizzesRepository: Repository<QuizEntity>,
  ) {}

  async createQuiz(data: QuizCreateDTO, payload: JwtPayload) {
    const member_id = payload.sub;
    console.log('memberId', member_id);

    const member = new MemberEntity();
    member.id = member_id;

    const quiz = new QuizEntity();
    quiz.title = data.title;
    quiz.content = data.content;
    quiz.answer = data.answer;
    quiz.member = member;

    await this.quizzesRepository.save(quiz);
  }

  async getAllQuiz() {
    // const quizzes = await this.quizzesRepository
    //   .createQueryBuilder('q')
    //   .innerJoinAndSelect('q.memberEntity', 'Member')
    //   .getMany();
    // console.log(quizzes);
  }
}
