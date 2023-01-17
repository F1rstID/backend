import { MemberEntity } from './../members/members.entity';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { CommentEntity } from 'src/comments/comments.entity';
import { QuizLikeEntity } from 'src/quiz-likes/quiz-likes.entity';

@Entity({ name: 'Quiz' })
export class QuizEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @Column({ type: 'varchar', length: 36 })
  // mid: string;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'text' })
  answer: string;

  //* Relation */

  //* Member | N : 1 | Quiz
  @ManyToOne(() => MemberEntity, (member) => member.quizId)
  @JoinColumn({ name: 'member_id' })
  memberEntity: MemberEntity;

  //* Quiz | 1 : N | Comment
  @OneToMany(() => CommentEntity, (comment) => comment.id)
  commentId: CommentEntity[];

  //* Quiz | 1 : N | QuizLike
  @OneToMany(() => QuizLikeEntity, (quizLike) => quizLike.id)
  quizLikeId: QuizLikeEntity[];
}
