import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as typeOrmConfig from '../database/config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '../modules/user/user.module';
import { AuthModule } from '../modules/auth/auth.module';
import { QuestionModule } from 'src/modules/question/question.module';
import { AnswerModule } from 'src/modules/answer/answer.module';
import { CommentModule } from 'src/modules/comment/comment.module';
import { TagModule } from 'src/modules/tag/tag.module';
import { NotificationModule } from 'src/modules/notification/notification.module';
import { WinstonModule } from 'nest-winston';
import { winstonOptions } from 'src/app-logging';

@Module({
  imports: [
    // Configuration Modules
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeOrmConfig),
    WinstonModule.forRoot(winstonOptions),

    // Forum Modules
    UserModule,
    AuthModule,
    QuestionModule,
    AnswerModule,
    CommentModule,
    TagModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
