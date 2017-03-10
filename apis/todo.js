const Router = require('koa-router');

module.exports = Todo =>

  new Router({ prefix: '/todos' })

    .get('/', async (ctx, next) => {
      ctx.body = await Todo.find({
        lid: Number(ctx.params.lid)
      });
    })

    /**
     * POST /todo-list/:lid/todo
     * @param  {String}  name      REQUIRED. todo name
     * @param  {Number}  deadline  OPTIONAL.
     * @param  {Boolean} completed OPTIONAL. default: false
     * @return {Object}            error handling and/or todo
     */
    .post('/', async (ctx, next) => {
      const data = Object.assign({}, ctx.request.body);
      data.lid = Number(ctx.params.lid);
      data.createdAt = new Date();
      data.deadline = new Date(Number(data.deadline));
      data.completed = data.completed === 'true';
      ctx.body = await new Todo(data).save();
    })

    .get('/:tid', async (ctx, next) => {
      ctx.body = await Todo.findById(Number(ctx.params.tid));
    })

    /**
     * POST /todo-list/:lid/todo/:tid
     * @param  {String}  name      REQUIRED. todo name
     * @param  {Number}  deadline  OPTIONAL.
     * @param  {Boolean} completed OPTIONAL. default: false
     * @return {Object}            error handling and/or todo
     */
    .put('/:tid', async (ctx, next) => {
      const data = Object.assign({}, ctx.request.body);
      data.lid = Number(ctx.params.lid);
      data.createdAt = new Date();
      data.deadline = new Date(Number(data.deadline));
      data.completed = data.completed === 'true';
      ctx.body = await Todo.findByIdAndUpdate(Number(ctx.params.tid), data);
    })

    .delete('/:tid', async (ctx, next) => {
      ctx.body = await Todo.deleteById(Number(ctx.params.tid));
    });
