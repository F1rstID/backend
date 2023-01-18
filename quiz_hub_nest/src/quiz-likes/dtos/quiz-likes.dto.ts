import { QuizLikeEntity } from 'src/quiz-likes/quiz-likes.entity';
import { PickType } from '@nestjs/swagger';
export class QuizLikesDTO extends PickType(QuizLikeEntity, [
  'quiz_id',
  'member_id',
  'like',
] as const) {}
