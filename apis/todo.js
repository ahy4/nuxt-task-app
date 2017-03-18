const Router = require('koa-router');

// もうちょい良い書き方ありそう

module.exports = ({ TodoList, Todo }) =>

  new Router()

    .use('/todos', new Router()

      .get('/', async (ctx, next) => {
        const q = ctx.query.q || '';
        const todos = await Todo.find({ name: new RegExp(q) });
        ctx.body = await Promise.all(todos.map(async todo => {
          const listName = (await TodoList.findById(todo.lid)).name;
          return Object.assign({ listName }, todo._doc);
        }));
      })

      .put('/:tid', async (ctx, next) => {
        const data = Object.assign({}, ctx.request.body);
        ctx.body = await Todo.update({_id: Number(ctx.params.tid)}, data);
      })

      .routes())

    .use('/todo-lists/:lid/todos', new Router()

      .get('/', async (ctx, next) => {
        ctx.body = await Todo.find({
          lid: Number(ctx.params.lid)
        });
      })

      .post('/', async (ctx, next) => {
        const data = Object.assign({}, ctx.request.body);
        data.lid = Number(ctx.params.lid);
        data.createdAt = new Date();
        data.deadline = new Date(Number(data.deadline));
        data.checked = data.checked === 'true';
        ctx.body = await new Todo(data).save();
      })

      .get('/:tid', async (ctx, next) => {
        ctx.body = await Todo.findById(Number(ctx.params.tid));
      })

      .put('/:tid', async (ctx, next) => {
        const data = Object.assign({}, ctx.request.body);
        data.lid = Number(ctx.params.lid);
        data.createdAt = new Date();
        data.deadline = new Date(Number(data.deadline));
        data.checked = data.checked === 'true';
        ctx.body = await Todo.findByIdAndUpdate(Number(ctx.params.tid), data);
      })

      .delete('/:tid', async (ctx, next) => {
        ctx.body = await Todo.deleteById(Number(ctx.params.tid));
      })

      .routes());
