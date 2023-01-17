import { IsString, IsNotEmpty } from 'class-validator';
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
import { Exclude } from 'class-transformer';

@Entity({ name: 'Member' })
export class MemberEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsString()
  @IsNotEmpty({ message: 'ID를 작성해주세요.' })
  @Column({ type: 'varchar', length: 32 })
  memberId: string;

  @IsString()
  @IsNotEmpty({ message: 'Password를 입력해주세요.' })
  @Exclude()
  @Column({ type: 'varchar', length: 32 })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'Nickname을 입력해주세요.' })
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
