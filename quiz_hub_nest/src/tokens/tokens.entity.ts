import { MemberEntity } from './../members/members.entity';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'Token' })
export class TokenEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  token: string;

  //* Relation */

  //* Member | 1 : 1 | Token
  @OneToOne(() => MemberEntity)
  @JoinColumn({ name: 'member_id' })
  memberEntity: MemberEntity;
}
