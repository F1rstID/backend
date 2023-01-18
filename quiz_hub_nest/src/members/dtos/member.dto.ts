import { MemberEntity } from 'src/members/members.entity';
import { OmitType } from '@nestjs/swagger';
export class MemberDTO extends OmitType(MemberEntity, ['password'] as const) {}
