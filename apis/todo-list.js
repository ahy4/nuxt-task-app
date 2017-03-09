const Router = require('koa-router');
const ObjectId = require('mongoose').Schema.Types.ObjectId;

console.log('objectid: ', new ObjectId('123345'));

module.exports = TodoList =>

  new Router({ prefix: '/todo-lists' })

    .get('/', async (ctx, next) => {
      ctx.body = await TodoList.find();
    })

    .post('/', async (ctx, next) => {
      ctx.body = await new TodoList(ctx.request.body).save();
    })

    .get('/:lid', async (ctx, next) => {
      console.log(new ObjectId(String(ctx.params.lid)));
      ctx.body = await TodoList.findById(String(ctx.params.lid));
    });
