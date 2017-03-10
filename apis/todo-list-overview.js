const Router = require('koa-router');
const Promise = require('bluebird');

module.exports = (TodoList, Todo) =>

  new Router({ prefix: '/todo-list-overview' })

    .get('/', async (ctx, next) => {
      const todoLists = await TodoList.find();
      const lists = await Promise.all(todoLists.map(async (todoList) => {
        const lid = todoList._id;
        const todos = await Todo.find({lid});
        return {
          name: todoList.name,
          todos
        };
      }));
      // console.log(lists);
      const result = lists.map((list) => {
        // console.log('list:', list);
        const name = list.name;
        const count = list.todos.length;
        const data = { name, count };
        if (count === 0) {
          data.hasChild = false;
          data.latestUpdate = Number.POSITIVE_INFINITY;
        } else {
          data.hasChild = true;
          data.checkedCount = list.todos.filter(({completed}) => completed).length;
          data.latestUpdate = list.todos.reduce((todoA, todoB) => Math.max(todoA.createdAt, todoB.createdAt), {createdAt: 0});
          const now = +new Date();
          data.deadline = list.todos
            .map((todo) => (todo && todo.deadline) || 1) // because deadline is optional
            .reduce((deadlineA, deadlineB) => {
              return Math.abs(deadlineA - now) < Math.abs(deadlineB - now) ? deadlineA : deadlineB;
            }, 1);
        }
        // console.log('data:', data);
        return data;
      }).sort((a, b) => b.latestUpdate - a.latestUpdate).map((o) => {
        delete o.latestUpdate;
        return o;
      });
      // console.log(result);
      ctx.body = JSON.stringify(result);
    });

// TodoListからnameをぜんぶ取ってくる
// そのTodoList一つあたりについてるTodoを全部取ってくる
// Todoの個数、completedの個数を調べる
// 最新で追加した日付順にする
// 一番〆切が近いものを表示
