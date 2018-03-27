const Router = require('koa-router')
const router = new Router()

module.exports = () => {

  const cocText = require('./text/coc')

  router.get('/', async (ctx) => {
    await ctx.render('index', {
      content: 'hello'
    })
  })
  router.get('/coc/:city', async (ctx) => {
    await ctx.render('coc', cocText[ctx.params.city] || {})
  })

  return router;
}
