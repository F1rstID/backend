import { QuizLikeEntity } from 'src/quiz-likes/quiz-likes.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class QuizLikesService {
  constructor(
    @InjectRepository(QuizLikeEntity)
    private readonly quizLikesRepository: Repository<QuizLikeEntity>,
  ) {}

  async likeEvent(quizId, member_id, like) {
    const quizLikeData = await this.quizLikesRepository.findOneBy({
      quiz_id: quizId,
      member_id: member_id,
    });

    if (quizLikeData) {
      if (quizLikeData.like === like) {
        return await this.quizLikesRepository.delete({ id: quizLikeData.id });
      }
      return await this.quizLikesRepository.update(
        { id: quizLikeData.id },
        { like },
      );
    }
    return await this.quizLikesRepository.save({
      quiz_id: quizId,
      member_id: member_id,
      like: like,
    });
  }
}
