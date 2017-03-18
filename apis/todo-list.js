const Router = require('koa-router');

module.exports = ({ TodoList, Todo }) =>

  new Router({ prefix: '/todo-lists' })

    .get('/', async (ctx, next) => {
      const q = ctx.query.q || '';
      ctx.body = await TodoList.find({ name: new RegExp(q) });
    })

    .post('/', async (ctx, next) => {
      const data = Object.assign({}, ctx.request.body);
      data.createdAt = new Date();
      ctx.body = await new TodoList(data).save();
    })

    .get('/overview', getOverview({ TodoList, Todo }))

    .get('/:lid', async (ctx, next) => {
      ctx.body = await TodoList.findById(Number(ctx.params.lid));
    })

    .put('/:lid', async (ctx, next) => {
      const data = Object.assign({}, ctx.request.body);
      data.createdAt = new Date();
      ctx.body = await TodoList.findByIdAndUpdate(Number(ctx.params.lid), data);
    })

    .delete('/:lid', async (ctx, next) => {
      ctx.body = await TodoList.findByIdAndDelete(Number(ctx.params.lid));
    });

function getOverview({ TodoList, Todo }) {
  return async (ctx, next) => {
    const todoLists = await TodoList.find();
    const lists = await Promise.all(todoLists.map(async (todoList) => {
      const lid = todoList._id;
      const name = todoList.name;
      const todos = await Todo.find({lid});
      return { lid, name, todos };
    }));
    const result = lists.map((list) => {
      const { lid, name } = list;
      const count = list.todos.length;
      const data = { _id: lid, name, count };
      if (count === 0) {
        data.hasChild = false;
        data.latestUpdate = Number.POSITIVE_INFINITY;
      } else {
        data.hasChild = true;
        data.checkedCount = list.todos.filter(({checked}) => checked).length;
        data.latestUpdate = list.todos.reduce((todoA, todoB) => Math.max(todoA.createdAt, todoB.createdAt), {createdAt: 0});
        const now = +new Date();
        data.deadline = list.todos
          .map((todo) => (todo && todo.deadline) || 1) // because deadline is optional
          .reduce((deadlineA, deadlineB) => {
            return Math.abs(deadlineA - now) < Math.abs(deadlineB - now) ? deadlineA : deadlineB;
          }, 1);
      }
      return data;
    }).sort((a, b) => b.latestUpdate - a.latestUpdate).map((o) => {
      delete o.latestUpdate;
      return o;
    });
    ctx.body = JSON.stringify(result);
  };
}
