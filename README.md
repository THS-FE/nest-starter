## 说明

基于[Nest](https://github.com/nestjs/nest) 的原型工程

### 前置知识

Nodejs、Typescript、Express、Mongodb

由于Nest 许多设计受angular启发，所以会angular的同学，学习会相当快

### 环境要求

1. Node.js

2. mongodb

3.  Nest CLI

   ```bash
   npm i -g @nestjs/cli
   ```

## 安装依赖

在项目跟目录下执行

```bash
$ npm install
```

## 运行应用

在项目跟目录下执行

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## 项目主要模块介绍

![image-20200627161943548](D:\workproject\nestjs\nest-starter\README.assets\image-20200627161943548.png)

1. News模块：为示例模块，存在一些示例用法，比如基本的get post请求、第三方服务器资源请求等
2. Auth模块：为认证模块，如果需要接口认证，其他业务模块需要引入该模块加以配置，并配合该模块的登录接口进行认证操作
3. Comm模块：封装一些通用的接口，比如附件的上传，下载功能

## 项目配置说明

### 应用访问相关配置

代码路径：nest-starter\src\setup\constants.ts

```typescript
// 应用程序相关配置
export const APP_CONFIG = {
    APP_PORT: 3000, // 运行的端口设置
    APP_GLOBAL_PREFIX: 'thsapp', // 基础路径指定
    STATIC_FILE_PATH: 'public', // 配置虚拟目录
    STATIC_FILE_PREFIX: '/static/', // 设置虚拟路径
};
```

1. APP_PORT：应用启动后程序运行占用的端口号，**注意：确保该端口未被其他程序占用**

2. APP_GLOBAL_PREFIX：应用启动后，浏览器访问的公共前缀，紧跟端口后，可设置为空

3. STATIC_FILE_PATH：配置静态资源的存放目录，与src 同级，可用于部署vue、angular等web项目

4. STATIC_FILE_PREFIX：与STATIC_FILE_PATH配合使用，静态资源目录的浏览器访问地址

以当前配置为例，如果启动该程序，浏览器访问路径为：

**接口访问地址举例：http://localhost:3000/thsapp/news/1/1?keywords=**

**静态页面访问地址举例：http://localhost:3000/static/hello.html**

 ### 数据库相关配置 

本原型工程使mongodb数据库，以下都是针对该数据库的设置

 代码路径：nest-starter\src\setup\constants.ts

```typescript
// DB相关配置
export const DB = {
    USER: 'liuyx', // 没有用户时，设置null
    PASS: '123456', // 没有密码时，设置null
    HOST: '127.0.0.1',
    PORT: '27017',
    DATABASE: 'portal',
    AUTHSOURCE: null, // 没有认证源时，设置null
};
```

1. USER：数据库用户名
2. PASS：数据库密码
3. HOST：数据库服务器地址
4. PORT：数据库使用的端口
5. DATABASE：要连接的数据名称
6. AUTHSOURCE：认证源设置，也就是该数据库认证如果依赖于另外的数据库时，需要设置数据库名称。

### 接口认证设置

本工程使用JWT实现了token认证，相关设置如下

代码路径：nest-starter\src\setup\constants.ts

```typescript
// 接口认证相关配置
export const AUTH = {
    SECRET: 'secretKey',
    EXPIRES_IN: 7200, // 过期时间 秒
};
```

1. SECRET：密钥字符串

2. EXPIRES_IN：生成token字符串的过期时间，单位是秒

### Swagger相关配置
本工程内置了swagger，按照[swagger](https://www.npmjs.com/package/@nestjs/swagger)要求进行配置，可以做到生成在线接口文档

代码路径：nest-starter\src\setup\constants.ts

```typescript
// SWAGGER 相关参数配置
export const SWAGGER_CONFIG = {
    API_ROOT: 'api/docs', // API文档的路径
    API_NAME: '思路移动应用平台', // API文档的名字
    API_DESCRIPTION: '原型工程，用于演示', // API文档的描述
    API_CURRENT_VERSION: '1.0', // API文档的版本
};
```

以当前配置为例，如果启动该程序，浏览器访问路径为：

http://localhost:3000/api/docs

### 系统日志相关配置

代码路径：nest-starter\src\setup\constants.ts

```typescript
// 日志 相关参数配置
export const LOGGER_CONFIG = {
    LOG_DIRECTORY: '../../log', // 日志输出目录
    IS_OUTPUTFILE: true, // 日志是否保存文件中，如果设置成false,只控制台输出
    FORMAT: 'combined', // 日志输出格式 比如combined、short等，默认是default
};
```

1. 当IS_OUTPUTFILE设置为true时，会按照日期格式在LOG_DIRECTORY设置的目录下生成日志文件。如果设置为false，日志会在控制台输出

2. FORMAT：设置日志输出格式

当前配置日志输出路径：nest-starter\log

### 文件上传相关配置

代码路径：nest-starter\src\setup\constants.ts

```typescript
// 文件上传相关
export const UPLOAD_FILE = {
    RELATIVE_PATH: '../../upload', // 文件上传目录
    REAL_PATH: '', // 实际目录，无需设置，会根据RELATIVE_PATH生成绝对路径，这里是为了其他功能获取
    IS_CREATE_THUMP: true, // 如果是图片，是否生成缩略图
    THUMP_CONFIG: [{ w: 100, h: 100, quality: 80 }, { w: 256, h: 256, quality: 80 }, { w: 50, quality: 80 }], // 如果是图片，生成缩略图多个的参数
};
```

1. RELATIVE_PATH：项目文件夹路径，用于存放上传的文件。当前配置，对应路径为nest-starter\upload
2. IS_CREATE_THUMP：对图片有效，可控制图片是否生成缩略图
3. THUMP_CONFIG：可设置多个缩略图，分别设置尺寸质量
### 访问速率限制配置

为了防止恶意程序的攻击，可对相同IP下访问频次进行设置。以下为本项目默认配置

代码路径：nest-starter\src\setup\constants.ts

```typescript
// 访问速率限制配置
export const RATELIMIT_CONFIG = {
    WINDOW_MS: 15 * 60 * 1000, // 时间间隔
    MAX: 1000, // 时间间隔内最大的访问次数
};
```

以上配置的意思是同一个IP下，15分钟内最大只能访问1000次该程序

## 资源

官网：https://nestjs.com/

中文网站：https://docs.nestjs.cn/

GitHub:https://github.com/nestjs/nest

----

如果大家在使用过程中有什么意见及问题，请及时反馈