const Router = require('koa-router');
// const ObjectId = require('mongoose').Schema.Types.ObjectId;

module.exports = Todo =>

  new Router({ prefix: '/todos' })

    .get('/', async (ctx, next) => {
      ctx.body = await Todo.find();
    })

    .post('/', async (ctx, next) => {
      ctx.body = await new Todo(ctx.request.body).save();
    })

    .get('/:tid', async (ctx, next) => {
      ctx.body = await Todo.findById(ctx.params.id);
    });
