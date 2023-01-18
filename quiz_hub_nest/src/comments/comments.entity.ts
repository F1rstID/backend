import { IsNotEmpty, IsString } from 'class-validator';
import { CommentLikeEntity } from 'src/comment-likes/comment-likes.entity';
import { MemberEntity } from 'src/members/members.entity';
import { QuizEntity } from 'src/quizzes/quizzes.entity';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'Comment' })
export class CommentEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  comment: string;

  //* Relation */

  //* Comment | N : 1 | Member
  @ManyToOne(() => MemberEntity, (member) => member.comment)
  @JoinColumn({ name: 'member_id' })
  member: MemberEntity;

  //* Comment | N : 1 | Quiz
  @ManyToOne(() => QuizEntity, (quiz) => quiz.comment)
  @JoinColumn({ name: 'quiz_id' })
  quiz: QuizEntity;

  //* Comment | 1 : N | CommentLike
  @OneToMany(() => CommentLikeEntity, (commentLike) => commentLike.comment)
  commentLike: CommentLikeEntity[];
}
