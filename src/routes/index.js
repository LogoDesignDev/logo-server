const router = require('koa-router')();
const DbConnection = require('../utils/dbConnection');

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  const conn = new DbConnection();
  await conn.connect();

  const res = await conn.find('user', {});
  ctx.body = {
    res
  };
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
