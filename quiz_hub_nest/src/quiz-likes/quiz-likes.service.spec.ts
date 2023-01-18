import { Test, TestingModule } from '@nestjs/testing';
import { QuizLikesService } from './quiz-likes.service';

describe('QuizLikesService', () => {
  let service: QuizLikesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuizLikesService],
    }).compile();

    service = module.get<QuizLikesService>(QuizLikesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
