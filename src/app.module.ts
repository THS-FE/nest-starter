import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommModule } from './modules/comm/comm.module';
import { DB } from './setup/constants';
import { NewsModule } from './modules/news/news.module';
import { AuthModule } from './modules/auth/auth.module';
const userString = DB.USER && DB.PASS ? (DB.USER + ':' + DB.PASS + '@') : '';
const authSource = DB.AUTHSOURCE ? ('?authSource=' + DB.AUTHSOURCE + '&w=1') : '' ;

@Module({
  imports: [
    // 'mongodb://liuyx:123456@127.0.0.1:27017/portal'
    // 注册相关模块，配置数据库链接
    // tslint:disable-next-line:max-line-length
    MongooseModule.forRoot('mongodb://' + userString + DB.HOST + ':' + (DB.PORT || '27017') + '/' + DB.DATABASE + authSource, { useNewUrlParser: true, useUnifiedTopology: true }),
    CommModule,
    NewsModule,
    AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
