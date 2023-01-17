import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Comment' })
export class CommentEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  cid: string;

  @Column({ type: 'varchar', length: 36 })
  mid: string;

  @Column({ type: 'varchar', length: 36 })
  qid: string;

  @Column({ type: 'text' })
  comment: string;
}
