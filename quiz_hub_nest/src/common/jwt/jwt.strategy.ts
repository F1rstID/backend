import { JwtPayload } from './jwt.payload';
import { ConfigService } from '@nestjs/config';
import { MembersService } from './../../members/members.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly membersService: MembersService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('SECRET_KEY'),
      ignoreExpiration: true,
    });
    // super();
  }

  async validate(payload: JwtPayload) {
    try {
      const member = await this.membersService.findMemberById(payload.sub);
      if (member) return payload;
      throw new Error();
    } catch (err) {
      throw new BadRequestException('Wrong credentials provided.');
    }
  }
}
