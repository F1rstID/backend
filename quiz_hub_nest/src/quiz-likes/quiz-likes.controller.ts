import { JwtAuthGuard } from './../common/jwt/jwt.guard';
import { JwtPayload } from './../common/jwt/jwt.payload';
import { QuizLikesDTO } from './dtos/quiz-likes.event.dto';
import { QuizLikesService } from './quiz-likes.service';
import { Body, Controller, Param, Put, UseGuards } from '@nestjs/common';
import { jwtPayload } from 'src/common/decorators/jwt.payload.decorator';

@Controller('quiz')
export class QuizLikesController {
  constructor(private readonly quizLikeService: QuizLikesService) {}

  @UseGuards(JwtAuthGuard)
  @Put(':quizId/like')
  async likeEvent(
    @Body() quizLikesDTO: QuizLikesDTO,
    @Param('quizId') quizId: number,
    @jwtPayload() payload: JwtPayload,
  ) {
    const { like } = quizLikesDTO;
    const { sub } = payload;
    return await this.quizLikeService.likeEvent(quizId, sub, like);
  }
}
