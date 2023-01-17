import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Quiz' })
export class QuizEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  qid: string;

  @Column({ type: 'varchar', length: 36 })
  mid: string;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'text' })
  answer: string;
}
