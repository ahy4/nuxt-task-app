const Router = require('koa-router');

module.exports = TodoList =>

  new Router({ prefix: '/todo-lists' })

    .get('/', async (ctx, next) => {
      ctx.body = await TodoList.find();
    })

    .post('/', async (ctx, next) => {
      ctx.body = await new TodoList(ctx.request.body).save();
    })

    .get('/:lid', async (ctx, next) => {
      ctx.body = await TodoList.findById(Number(ctx.params.lid));
    })

    .put('/:lid', async (ctx, next) => {
      ctx.body = await TodoList.findByIdAndUpdate(Number(ctx.params.lid), ctx.request.body);
    })

    .delete('/:lid', async (ctx, next) => {
      ctx.body = await TodoList.findByIdAndDelete(Number(ctx.params.lid));
    });
