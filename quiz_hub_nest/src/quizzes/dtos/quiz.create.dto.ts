import { QuizEntity } from '../quizzes.entity';
import { PickType } from '@nestjs/swagger';
export class QuizCreateDTO extends PickType(QuizEntity, [
  'title',
  'content',
  'answer',
] as const) {}
