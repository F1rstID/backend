import { CommentLikeEntity } from './comment-likes/comment-likes.entity';
import { QuizLikeEntity } from './quiz-likes/quiz-likes.entity';
import { QuizEntity } from './quizzes/quizzes.entity';
import { CommentEntity } from './comments/comments.entity';
import { TokenEntity } from './tokens/tokens.entity';
import { MemberEntity } from './members/members.entity';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MembersModule } from './members/members.module';
import { QuizzesModule } from './quizzes/quizzes.module';
import { TokensModule } from './tokens/tokens.module';
import { CommentsModule } from './comments/comments.module';
import { QuizLikesModule } from './quiz-likes/quiz-likes.module';
import { CommentLikesModule } from './comment-likes/comment-likes.module';

const typeOrmModuleOptions = {
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => ({
    // namingStrategy: new SnakeNamingStrategy(),
    type: 'mysql',
    host: configService.get('DB_HOST'),
    port: 3306,
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DATABASE_NAME'),
    entities: [
      MemberEntity,
      TokenEntity,
      CommentEntity,
      QuizEntity,
      QuizLikeEntity,
      CommentLikeEntity,
    ],
    synchronize: true, // FIXME: 배포시 false 할것.
    autoLoadEntities: true,
    logging: true,
    keepConnectionAlive: true,
  }),
  inject: [ConfigService],
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmModuleOptions),
    MembersModule,
    QuizzesModule,
    TokensModule,
    CommentsModule,
    QuizLikesModule,
    CommentLikesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
