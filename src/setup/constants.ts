// 应用程序相关配置
export const APP_CONFIG = {
    APP_PORT: 3000, // 运行的端口设置
    APP_GLOBAL_PREFIX: 'thsapp', // 基础路径指定
    STATIC_FILE_PATH: 'public', // 配置虚拟目录
    STATIC_FILE_PREFIX: '/static/', // 设置虚拟路径
};

// DB相关配置
export const DB = {
    USER: 'liuyx', // 没有用户时，设置null
    PASS: '123456', // 没有密码时，设置null
    HOST: '127.0.0.1',
    PORT: '27017',
    DATABASE: 'portal',
    AUTHSOURCE: null, // 没有认证源时，设置null
};

// 接口认证相关配置
export const AUTH = {
    SECRET: 'secretKey',
    EXPIRES_IN: 7200, // 过期时间 秒
};

// SWAGGER 相关参数配置
export const SWAGGER_CONFIG = {
    API_ROOT: 'api/docs', // API文档的路径
    API_NAME: '思路移动应用平台', // API文档的名字
    API_DESCRIPTION: '原型工程，用于演示', // API文档的描述
    API_CURRENT_VERSION: '1.0', // API文档的版本
};

// 日志 相关参数配置
export const LOGGER_CONFIG = {
    LOG_DIRECTORY: '../../log', // 日志输出目录
    IS_OUTPUTFILE: true, // 日志是否保存文件中，如果设置成false,只控制台输出
    FORMAT: 'combined', // 日志输出格式 比如combined、short等，默认是default
};

// 文件上传相关
export const UPLOAD_FILE = {
    RELATIVE_PATH: '../../upload', // 文件上传目录
    REAL_PATH: '', // 实际目录，无需设置，会根据RELATIVE_PATH生成绝对路径，这里是为了其他功能获取
    IS_CREATE_THUMP: true, // 如果是图片，是否生成缩略图
    THUMP_CONFIG: [{ w: 100, h: 100, quality: 80 }, { w: 256, h: 256, quality: 80 }, { w: 50, quality: 80 }], // 如果是图片，生成缩略图多个的参数
};

// 访问速率限制配置
export const RATELIMIT_CONFIG = {
    WINDOW_MS: 15 * 60 * 1000, // 时间间隔
    MAX: 1000, // 时间间隔内最大的访问次数
};
