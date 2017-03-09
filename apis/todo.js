const Router = require('koa-router');

module.exports = Todo =>

  new Router({ prefix: '/todos' })

    .get('/', async (ctx, next) => {
      ctx.body = await Todo.find({
        lid: Number(ctx.params.lid)
      });
    })

    .post('/', async (ctx, next) => {
      const data = Object.assign({
        lid: Number(ctx.params.lid)
      }, ctx.request.body);
      ctx.body = await new Todo(data).save();
    })

    .get('/:tid', async (ctx, next) => {
      ctx.body = await Todo.findById(Number(ctx.params.tid));
    })

    .put('/:tid', async (ctx, next) => {
      const data = Object.assign({
        lid: Number(ctx.params.lid)
      }, ctx.request.body);
      ctx.body = await Todo.findByIdAndUpdate(Number(ctx.params.tid), data);
    })

    .delete('/:tid', async (ctx, next) => {
      ctx.body = await Todo.deleteById(Number(ctx.params.tid));
    });
