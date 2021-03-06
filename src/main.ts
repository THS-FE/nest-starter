import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as compression from 'compression';
import { setupSwagger, setupLogger, setupRateLimit, setupUploadDirectory } from './setup/setup-utils';
import { APP_CONFIG } from './setup/constants';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { join } from 'path';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {});
  // 安全性中间件，防护包含点击劫持、xss、嗅探攻击...
  app.use(helmet());
  // 启用CORS
  app.enableCors();
  // 对于生产中流量较高的，最好的压缩方式是在反向代理级别实施它。
  // 在这种情况下，您无需使用压缩中间件。
  app.use(compression());
  // 设置全局的异常处理,统一返回的异常数据格式
  app.useGlobalFilters(new HttpExceptionFilter());
  // 全局注册拦截器,统一正常返回的数据格式
  app.useGlobalInterceptors(new TransformInterceptor());
  // 为了保护应用程序免受暴力攻击，进行访问速率限制
  setupRateLimit(app);
  // 日志记录设置
  setupLogger(app);
  // 设置上传文件目录
  setupUploadDirectory();
  // 设置应用的公共前缀，也就是基础路径
  app.setGlobalPrefix(APP_CONFIG.APP_GLOBAL_PREFIX);

  // 设置静态资源目录
  app.useStaticAssets(join(__dirname, '..', APP_CONFIG.STATIC_FILE_PATH), {   // 配置虚拟目录
    prefix: APP_CONFIG.STATIC_FILE_PREFIX, // 设置虚拟路径
  });
  // 设置模板view目录
  app.setBaseViewsDir('views');
  // 设置模板渲染引擎
  app.setViewEngine('ejs');
  // 全局使用管道
  app.useGlobalPipes(new ValidationPipe({whitelist: false})); // true开启白名单，过滤掉方法处理程序不应该接收的属性,false可以接收传递过来的所有参数
  // Swagger 设置
  setupSwagger(app);
  // 设置应用的监听的端口
  await app.listen(APP_CONFIG.APP_PORT || 3000);
}
bootstrap();
