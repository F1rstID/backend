import { MemberEntity } from 'src/members/members.entity';
import { PickType } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
export class MemberRegisterDTO extends PickType(MemberEntity, [
  'memberId',
  'nickname',
] as const) {
  @IsString()
  @IsNotEmpty({ message: '비밀번호가 공백입니다.' })
  password: string;
}
