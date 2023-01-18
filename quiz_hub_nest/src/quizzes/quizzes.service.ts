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

  async createQuiz(data, payload) {
    const member_id = payload.sub;
    console.log('memberId', member_id);

    await this.quizzesRepository.save({ ...data, member_id: member_id });
  }
}
