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

  @IsString()
  @IsNotEmpty()
  @Column({ type: 'uuid' })
  member_id: string;

  @IsString()
  @IsNotEmpty()
  @Column({ type: 'uuid' })
  quiz_id: string;

  //* Relation */

  //* Comment | N : 1 | Member
  @ManyToOne(() => MemberEntity, (member) => member.commentId)
  @JoinColumn({ name: 'member_id' })
  memberEntity: MemberEntity;

  //* Comment | N : 1 | Quiz
  @ManyToOne(() => QuizEntity, (quiz) => quiz.commentId)
  @JoinColumn({ name: 'quiz_id' })
  quizEntity: QuizEntity;

  //* Comment | 1 : N | CommentLike
  @OneToMany(() => CommentLikeEntity, (commentLike) => commentLike.id)
  commentLikeId: CommentLikeEntity[];
}
