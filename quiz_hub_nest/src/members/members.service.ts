import { ConfigService } from '@nestjs/config';
import { MemberRegisterDTO } from './dtos/members.register.dto';
import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberEntity } from './members.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { MemberLoginDTO } from './dtos/members.login.dto';
import { MemberDTO } from './dtos/member.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(MemberEntity)
    private readonly membersRepository: Repository<MemberEntity>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async registerMember(memberRegisterDTO: MemberRegisterDTO): Promise<void> {
    const { memberId, password } = memberRegisterDTO;
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

  async login(
    memberId: MemberLoginDTO['memberId'],
    password: MemberLoginDTO['password'],
  ): Promise<{ jwt: string; member: MemberDTO }> {
    const member = await this.membersRepository.findOneBy({ memberId });
    //* 해당 memberId에 대응하는 member의 데이터가 없을시
    if (!member) throw new UnauthorizedException();
    //* 암호 검증 실패시
    if (!(await bcrypt.compare(password, member.password)))
      throw new UnauthorizedException();

    try {
      const jwt = await this.jwtService.signAsync(
        { sub: member.id },
        { secret: this.configService.get('SECRET_KEY') },
      );

      return { jwt, member };
    } catch (err) {
      throw new BadRequestException();
    }
  }

  async findMemberById(id: string) {
    try {
      const member = await this.membersRepository.findOneBy({ id });

      if (!member) throw new Error();
      return member;
    } catch (error) {
      throw new BadRequestException('This member does not exist.');
    }
  }
}
