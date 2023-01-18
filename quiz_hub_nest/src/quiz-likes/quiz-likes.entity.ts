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

  @IsString()
  @IsNotEmpty()
  @Column({ type: 'uuid' })
  member_id: string;

  @IsString()
  @IsNotEmpty()
  @Column({ type: 'uuid' })
  quiz_id: string;

  //* Relation */

  //* QuizLike | N : 1 | Quiz
  @ManyToOne(() => QuizEntity, (quiz) => quiz.quizLikeId)
  @JoinColumn({ name: 'quiz_id' })
  quizEntity: QuizEntity;

  //* QuizLike | N : 1 | Member
  @ManyToOne(() => MemberEntity, (member) => member.quizLikeId)
  @JoinColumn({ name: 'member_id' })
  memberEntity: MemberEntity;
}
