import { MemberRegisterDTO } from './members.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberEntity } from './members.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(MemberEntity)
    private readonly membersRepository: Repository<MemberEntity>,
  ) {}

  async registerMember(memberRegisterDTO: MemberRegisterDTO): Promise<void> {
    const { memberId, nickname, password } = memberRegisterDTO;
    const member = await this.membersRepository.findOneBy({ memberId });
    if (member) throw new UnauthorizedException('이미 존재하는 ID 입니다.');

    //* 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(password, 10);
    //* 멤버 생성
    await this.membersRepository.save({
      ...memberRegisterDTO,
      password: hashedPassword,
    });
  }
}
