const Koa = require('koa');
const path = require('path');
const bodyParser = require('koa-bodyparser');
const nunjucks = require('koa-nunjucks-2');

const app = new Koa();
const router = require('./router');

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
