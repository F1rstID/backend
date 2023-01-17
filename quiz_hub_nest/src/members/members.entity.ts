import { QuizEntity } from './../quizzes/quizzes.entity';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { CommentEntity } from 'src/comments/comments.entity';
import { QuizLikeEntity } from 'src/quiz-likes/quiz-likes.entity';
import { CommentLikeEntity } from 'src/comment-likes/comment-likes.entity';

@Entity({ name: 'Member' })
export class MemberEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 32 })
  memberId: string;

  @Column({ type: 'varchar', length: 32 })
  password: string;

  @Column({ type: 'varchar', length: 32 })
  nickname: string;

  //* Relation */

  //* Member | 1 : N | Quiz
  @OneToMany(() => QuizEntity, (quiz) => quiz.id)
  quizId: QuizEntity[];

  //* Member | 1 : N | Comment
  @OneToMany(() => CommentEntity, (comment) => comment.id)
  commentId: CommentEntity[];

  //* Member | 1 : N | QuizLike
  @OneToMany(() => QuizLikeEntity, (quizLike) => quizLike.id)
  quizLikeId: QuizLikeEntity[];

  //* Member | 1 : N | CommentLike
  @OneToMany(() => CommentLikeEntity, (commentLike) => commentLike.id)
  commentLikeId: CommentLikeEntity[];
}
