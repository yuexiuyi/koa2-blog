// 按照官方示例
const Koa = require('koa');
//注意 require('koa-router') 返回的是函数
const router = require('koa-router')();
const app = new Koa();
// const posts = new router();
// const forums = new router();

//如果要在 app.js 中使用 koa-router 来处理 URL，可以通过以下代码来实现：
// router.get('/', async (ctx, next) => {
//   ctx.response.body = `<h1>index page</h1>`
// })

// router.get('/home', async (ctx, next) => {
//   ctx.response.body = `<h1>home page</h1>`
// })

// router.get('/404', async (ctx, next) => {
//   ctx.response.body = `<h1>404 Not Found</h1>`
// })

//当然，除了 GET 方法，koa-router 也支持处理其他的请求方法，比如：
// router.get('/', async (ctx, next) => {
//   ctx.body = 'Hello World!';
// })
//   .post('/users', async (ctx, next) => {

//   })
//   .put('/users/:id', async (ctx, next) => {

//   })
//   .del('/users/:id', async (ctx, next) => {

//   })
//   .all('/users/:id', async (ctx, next) => {

//   })

//如果一条路由在`all`方法和其他方法中同时命中，只有执行了`await next()`，那么这条路由会在`all`方法和其他方法中都会起作用
// router.get('/', async (ctx, next) => {
//   ctx.response.body = `<h1>index page</h1>`;
//   await next();
// })

// router.all('/', async (ctx, next) => {
//   console.log('match "all" method');
//   await next();
// })

// //命名路由
// router.get('user', '/users/:id', function (ctx, next) {
//   ctx.response.body = `<h1>user page</h1>`;
// })

// router.url('user', 3);
// // 生成路由 “/user/3”


// router.url('user', { id: 3 });
// // 生成路由 “/user/3”

// router.use((ctx, next) => {
//   // 重定向路由名称为 “sign-in” 的页面
//   ctx.redirect(ctx.router.url('sign-in'));
// })


//多中间件
// router.get('/users/:id',
//   function (ctx, next) {
//     //User未定义
//     return User.fineOne(ctx.params, id).then(function (user) {
//       //首先读取用户的信息，异步操作
//       ctx.user = user;
//       next;
//     })
//   },
//   function (ctx) {
//     console.log(ctx.user);
//     //在这个中间件中再对用户信息做一些处理
//     // => { id: 17,name: "Alex" }
//   }
// );

//嵌套路由 调试失败 不知道怎么声明Router实例
// posts.get('/', async (ctx, next) => {
//   ctx.response.body = `<h1>/</h1>`;
// })
// posts.get('/:pid', (ctx, next) => {
//   ctx.response.body = `<h1>/:pid</h1>`;
// })
// forums.get('/forums/:fid/posts', posts.routes(), posts.allowedMethods());

// //调用路由中间件
// app.use(forums.posts());


router.get('/:category/:title', function (ctx, next) {
  console.log(ctx.params);
  // => { category: 'programming', title: 'how-to-node' }
});


//调用路由中间件
app.use(router.routes());


app.listen(3000, () => {
  console.log('server is running at http://localhost:3000');
})


