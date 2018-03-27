const Koa = require('koa')
const app = new Koa()

const views = require('koa-views')

const router = require('./routes')()

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
