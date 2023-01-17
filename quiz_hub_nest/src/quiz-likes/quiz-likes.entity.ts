import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'QuizLike' })
export class QuizLikeEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  qlid: string;

  @Column({ type: 'varchar', length: 36 })
  qid: string;

  @Column({ type: 'varchar', length: 36 })
  mid: string;

  @Column({ type: 'boolean' })
  like: boolean;
}
