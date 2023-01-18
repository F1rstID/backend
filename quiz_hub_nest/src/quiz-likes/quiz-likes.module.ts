import { JwtStrategy } from './../common/jwt/jwt.strategy';
import { QuizLikeEntity } from './quiz-likes.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { QuizLikesService } from './quiz-likes.service';
import { QuizLikesController } from './quiz-likes.controller';
import { MembersModule } from 'src/members/members.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuizLikeEntity]),
    PassportModule,
    MembersModule,
  ],
  providers: [QuizLikesService, JwtStrategy],
  controllers: [QuizLikesController],
})
export class QuizLikesModule {}
