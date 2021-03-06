const Koa = require('koa');
const path = require('path');
const bodyParser = require('koa-bodyparser');
const nunjucks = require('koa-nunjucks-2');
//引入 koa-static
const staticFiles = require('koa-static');

const app = new Koa();
const router = require('./router');

//指定 public目录为静态资源目录，用来存放 js css images 等
app.use(staticFiles(path.resolve(__dirname, './public')));

app.use(nunjucks({
  ext: 'html',
  path: path.join(__dirname, 'views'),// 指定视图目录
  nunjucksConfig: {
    trimBlocks: true //开启转移 防XSS攻击
  }
}));

app.use(bodyParser());
router(app);
app.listen(3000, () => {
  console.log('server is runing at http://localhost:3000');
})
