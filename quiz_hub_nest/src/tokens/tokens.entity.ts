import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Token' })
export class TokenEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  tid: string;

  @Column({ type: 'varchar', length: 36 })
  mid: string;

  @Column({ type: 'text' })
  token: string;
}
