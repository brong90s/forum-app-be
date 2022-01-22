import { Module } from '@nestjs/common';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';

@Module({
  providers: [QuestionService],
  controllers: [QuestionController],
})
export class QuestionModule {}
