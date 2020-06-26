import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleSchema } from '../../schemas/article.schema';
import { NewsService } from './news.service';
import { AuthModule } from '../auth/auth.module';
import { CommModule } from '../comm/comm.module';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: 'Article',
      schema: ArticleSchema,
      collection: 'article',
    },
  ]), AuthModule, CommModule],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
