import { JwtPayload } from './../common/jwt/jwt.payload';
import { JwtAuthGuard } from './../common/jwt/jwt.guard';
import { QuizCreateDTO } from './dtos/quiz.create.dto';
import { QuizzesService } from './quizzes.service';
import {
  Controller,
  Post,
  Body,
  Res,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Response } from 'express';
import { jwtPayload } from 'src/common/decorators/jwt.payload.decorator';

@Controller('quiz')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createQuiz(
    @Body() quizCreateDTO: QuizCreateDTO,
    @jwtPayload() payload: JwtPayload,
  ) {
    return this.quizzesService.createQuiz(quizCreateDTO, payload);
  }
}
