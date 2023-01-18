import { MemberEntity } from 'src/members/members.entity';
import { PickType } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
export class MemberLoginDTO extends PickType(MemberEntity, [
  'memberId',
  'password',
] as const) {
  @IsString()
  @IsNotEmpty({ message: 'ID가 공백입니다.' })
  memberId: string;

  @IsString()
  @IsNotEmpty({ message: 'PW가 공백입니다.' })
  password: string;
}
