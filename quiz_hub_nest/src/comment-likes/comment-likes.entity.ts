import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'CommentLike' })
export class CommentLikeEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  clid: string;

  @Column({ type: 'varchar', length: 36 })
  cid: string;

  @Column({ type: 'varchar', length: 36 })
  mid: string;

  @Column({ type: 'boolean' })
  like: boolean;
}
