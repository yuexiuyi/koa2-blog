const HomeService = require('../service/home');

module.exports = {
  index: async (ctx, next) => {
    await ctx.render("home/index", { title: "iKcamp欢迎您" })
  },
  home: async (ctx, next) => {
    ctx.response.body = `<h1>HOME page</h1>`;
  },
  homeParmas: async (ctx, next) => {
    ctx.response.body = `<h1>HOME page/${ctx.params.id}/${ctx.params.name}</h1>`;
  },
  login: async (ctx, next) => {
    await ctx.render("home/login")
  },
  register: async (ctx, next) => {
    let params = ctx.request.body
    let name = params.name
    let password = params.password
    let res = await HomeService.register(name, password)
    if (res.status == "-1") {
      await ctx.render("home/login", res.data)
    } else {
      ctx.state.title = "个人中心"
      await ctx.render("home/success", res.data)
    }
  },
}
