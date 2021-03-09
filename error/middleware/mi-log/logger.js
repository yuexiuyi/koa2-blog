
const log4js = require('log4js');
const access = require("./access.js");
const methods = ["trace", "debug", "info", "warn", "error", "fatal", "mark"]

//提取默认公用参数对象
const baseInfo = {
  appLogLevel: 'debug',//指定记录的日志级别
  dir: 'logs', // 指定日志存放的目录名
  env: 'dev',  // 指定当前环境，当为开发环境时，在控制台也输出，方便调试
  projectName: 'koa2-tutorial', //项目名，记录在日志中的项目信息
  serverIp: '0.0.0.0'  //默认情况下服务器 ip 地址
}

module.exports = (options) => {
  const contextLogger = {};
  const appenders = {};

  // 继承自 baseInfo 默认参数
  const opts = Object.assign({}, baseInfo, options || {});
  // 需要的变量解构 方便使用
  const { env, appLogLevel, dir, serverIp, projectName } = opts;
  const commonInfo = { projectName, serverIp };

  appenders.cheese = {
    type: 'dateFile', // 日志类型
    filename: `${dir}/task`, // 输出文件名
    pattern: '-yyyy-MM-dd.log', // 文件名增加后缀
    alwaysIncludePattern: true // 是否总有后缀名
  }

  if (env === "dev" || env === "local" || env === "development") {
    appenders.out = {
      type: "console"
    }
  }
  let config = {
    appenders,
    categories: {
      default: {
        appenders: Object.keys(appenders),
        level: appLogLevel
      }
    }
  };

  const logger = log4js.getLogger('cheese');

  return async (ctx, next) => {
    // 记录请求开始的时间
    const start = Date.now();

    log4js.configure(config)
    // 循环methods将所有方法挂在到ctx上
    methods.forEach((method, i) => {
      contextLogger[method] = (message) => {
        logger[method](access(ctx, message, commonInfo));
      }
    })

    // ctx.log = contextLogger;

    await next();
    // 记录
    // const responseTime = Date.now() - start;
    // logger.info(access(ctx, {
    //   responseTime: `响应时间为${responseTime / 1000}s`
    // }, commonInfo));
  }
}


