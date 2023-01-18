import { MemberLoginDTO } from './dtos/members.login.dto';
import { MemberRegisterDTO } from './dtos/members.register.dto';
import { Controller, Post, Body, Res } from '@nestjs/common';
import { MembersService } from './members.service';
import { Response } from 'express';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post('join')
  async signUp(@Body() memberRegisterDTO: MemberRegisterDTO) {
    console.log(memberRegisterDTO);
    return await this.membersService.registerMember(memberRegisterDTO);
  }

  @Post('login')
  async login(
    @Body() memberLoginDTO: MemberLoginDTO,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { jwt, member } = await this.membersService.login(
      memberLoginDTO.memberId,
      memberLoginDTO.password,
    );
    response.header('Authorization', `Bearer ${jwt}`);
    return member;
  }
}
