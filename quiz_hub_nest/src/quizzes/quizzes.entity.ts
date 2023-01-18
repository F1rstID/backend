import { Exclude } from 'class-transformer';
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
import { IsString, IsNotEmpty } from 'class-validator';

@Entity({ name: 'Quiz' })
export class QuizEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @IsString()
  @IsNotEmpty({ message: '제목이 공백입니다.' })
  @Column({ type: 'text' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: '내용이 공백입니다.' })
  @Column({ type: 'text' })
  content: string;

  @IsString()
  @IsNotEmpty({ message: '정답이 공백입니다.' })
  @Exclude()
  @Column({ type: 'text' })
  answer: string;

  //* Relation */

  //* Quiz | N : 1 | Member
  @ManyToOne(() => MemberEntity, (member) => member.quiz, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'member_id' })
  member: MemberEntity;
  //

  //* Quiz | 1 : N | Comment
  @OneToMany(() => CommentEntity, (comment) => comment.quiz)
  comment: CommentEntity[];

  //* Quiz | 1 : N | QuizLike
  @OneToMany(() => QuizLikeEntity, (quizLike) => quizLike.quiz)
  quizLike: QuizLikeEntity[];
}
