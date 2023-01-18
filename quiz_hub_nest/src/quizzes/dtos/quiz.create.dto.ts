import { QuizEntity } from '../quizzes.entity';
import { PickType } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
export class QuizCreateDTO extends PickType(QuizEntity, [
  'title',
  'content',
  'answer',
] as const) {}
