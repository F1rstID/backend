import { IsNotEmpty, IsString } from 'class-validator';
import { MemberEntity } from 'src/members/members.entity';
import { QuizEntity } from 'src/quizzes/quizzes.entity';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'QuizLike' })
export class QuizLikeEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'boolean' })
  like: boolean;

  //* Relation */

  //* QuizLike | N : 1 | Quiz
  @ManyToOne(() => QuizEntity, (quiz) => quiz.quizLike)
  @JoinColumn({ name: 'quiz_id' })
  quiz: QuizEntity;

  //* QuizLike | N : 1 | Member
  @ManyToOne(() => MemberEntity, (member) => member.quizLike)
  @JoinColumn({ name: 'member_id' })
  member: MemberEntity;
}
