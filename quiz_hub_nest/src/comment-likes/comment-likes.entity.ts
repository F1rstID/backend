import { CommentEntity } from 'src/comments/comments.entity';
import { MemberEntity } from 'src/members/members.entity';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'CommentLike' })
export class CommentLikeEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'boolean' })
  like: boolean;

  //* Relation */

  //* QuizLike | N : 1 | Quiz
  @ManyToOne(() => CommentEntity, (comment) => comment.commentLikeId)
  @JoinColumn({ name: 'comment_id' })
  commentEntity: CommentEntity;

  //* QuizLike | N : 1 | Member
  @ManyToOne(() => MemberEntity, (member) => member.commentLikeId)
  @JoinColumn({ name: 'member_id' })
  memberEntity: MemberEntity;
}
