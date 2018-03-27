const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()
const views = require('koa-views')

const cocText = require('./text/coc')

router.get('/', async (ctx) => {
  await ctx.render('index', {
    content: 'hello'
  })
})
router.get('/coc/:city', async (ctx) => {
  await ctx.render('coc', cocText[ctx.params.city])
})

app.use(views(__dirname + '/tpl', {
  map: {
    html: 'nunjucks'
  }
}))

app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}`)
})

app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

app.use(router.routes())

app.listen(8080)
