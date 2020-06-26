import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import * as morgan from 'morgan';
import * as FileStreamRotator from 'file-stream-rotator';
import * as fs from 'fs';
import * as path from 'path';
import * as rateLimit from 'express-rate-limit';
import { SWAGGER_CONFIG, LOGGER_CONFIG, RATELIMIT_CONFIG, UPLOAD_FILE } from './constants';

/**
 * 配置Swagger
 * @param app nest应用程序对象
 */
export const setupSwagger = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle(SWAGGER_CONFIG.API_NAME)
    .setDescription(SWAGGER_CONFIG.API_DESCRIPTION)
    .setVersion(SWAGGER_CONFIG.API_CURRENT_VERSION)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(SWAGGER_CONFIG.API_ROOT, app, document);
};

/**
 * 配置日志记录程序
 * @param app nest应用程序对象
 */
export const setupLogger = (app: INestApplication) => {
  // 设置日志输出目录
  const logDirectory = path.join(__dirname, LOGGER_CONFIG.LOG_DIRECTORY);

  // 确定日志输出目录是否存在，不存在就创建目录
  if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
  }
  // 是否保存日志进入文件
  if (LOGGER_CONFIG.IS_OUTPUTFILE) {
    // 日志流设置
    const accessLogStream = FileStreamRotator.getStream({
      date_format: 'YYYYMMDD',
      filename: path.join(logDirectory, 'access-%DATE%.log'),
      frequency: 'daily',
      verbose: false,
    });
    // 设置日志输出格式为标准Apache组合日志输出
    app.use(morgan(LOGGER_CONFIG.FORMAT, { stream: accessLogStream }));
  } else {
    app.use(morgan(LOGGER_CONFIG.FORMAT));
  }

};

/**
 * 设置上传文件目录
 */
export const setupUploadDirectory = () => {
  const fileDirectory = path.join(__dirname, UPLOAD_FILE.RELATIVE_PATH);
  // 确定文件目录是否存在
  if (!fs.existsSync(fileDirectory)) {
    fs.mkdirSync(fileDirectory);
  }
  UPLOAD_FILE.REAL_PATH = fileDirectory;
};

/**
 * 配置访问速率，免受暴力攻击
 * @param app nest应用程序对象
 */
export const setupRateLimit = (app: INestApplication) => {
  app.use(
    rateLimit({
      windowMs: RATELIMIT_CONFIG.WINDOW_MS, // 15 minutes
      max: RATELIMIT_CONFIG.MAX, // limit each IP to 100 requests per windowMs
    }),
  );
};
