import { MemberRegisterDTO } from './members.dto';
import { Controller, Post, Body } from '@nestjs/common';
import { MembersService } from './members.service';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post('join')
  async signUp(@Body() memberRegisterDTO: MemberRegisterDTO) {
    return await this.membersService.registerMember(memberRegisterDTO);
  }
}
