import { MembersModule } from './../members/members.module';
import { JwtStrategy } from 'src/common/jwt/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { QuizEntity } from './quizzes.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { QuizzesController } from './quizzes.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuizEntity]),
    PassportModule,
    MembersModule,
  ],
  providers: [QuizzesService, JwtStrategy],
  controllers: [QuizzesController],
})
export class QuizzesModule {}
