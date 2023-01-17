import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Member' })
export class MemberEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  mid: string;

  @Column({ type: 'varchar', length: 32 })
  memberId: string;

  @Column({ type: 'varchar', length: 32 })
  password: string;

  @Column({ type: 'varchar', length: 32 })
  nickname: string;
}
