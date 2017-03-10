const Koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const bodyparser = require('koa-bodyparser');
const app = new Koa();
const Nuxt = require('nuxt');
const mongoose = require('mongoose');
const dbConfig = require('./apis/db-config');
const todoListApi = require('./apis/todo-list');
const todoApi = require('./apis/todo');
const listOverviewApi = require('./apis/todo-list-overview');

const config = require('./nuxt.config.js');
config.dev = !(app.env === 'production');

const nuxt = new Nuxt(config);

// Build only in dev mode
if (config.dev) {
  nuxt.build().catch((error) => {
    console.error(error); // eslint-disable-line no-console
    process.exit(1);
  });
}

// if called api, use api. else render view
app.use(async (ctx, next) => {
  const isApi = ctx.url.match(/^\/api\//);
  if (isApi) {
    await next();
  } else {
    ctx.status = 200; // koa defaults to 404 when it sees that status is unset
    await nuxt.render(ctx.req, ctx.res);
  }
});

// DB schema setting
mongoose.connect(dbConfig.url);
const Counter = mongoose.model('Counter', new mongoose.Schema(dbConfig.schema.Counter));
new Counter({_id: 'TodoList'}).save();
new Counter({_id: 'Todo'}).save();

const TodoListSchema = new mongoose.Schema(dbConfig.schema.TodoList);
const TodoSchema = new mongoose.Schema(dbConfig.schema.Todo);

const autoIncrement = modelName => function (next) {
  Counter.findByIdAndUpdate({ _id: modelName }, { $inc: { seq: 1 } }, (error, counter) => {
    if (error) return next(error);
    this._id = counter.seq;
    next();
  });
};
TodoListSchema.pre('save', autoIncrement('TodoList'));
TodoSchema.pre('save', autoIncrement('Todo'));

mongoose.model('TodoList', TodoListSchema);
mongoose.model('Todo', TodoSchema);

// set api
const TodoList = mongoose.model('TodoList');
const Todo = mongoose.model('Todo');
const todoListRouter = todoListApi(TodoList);
const todoRouter = todoApi(Todo);
const listOverviewRouter = listOverviewApi(TodoList, Todo);
const api = new Router({ prefix: '/api' }) // merge apis
  .use('', todoListRouter.routes(), todoListRouter.allowedMethods())
  .use('/todo-lists/:lid', todoRouter.routes(), todoRouter.allowedMethods())
  .use('', listOverviewRouter.routes(), listOverviewRouter.allowedMethods());

// console.log(api);
// console.log(todoRouter);

app
  .use(bodyparser())
  .use(logger())
  .use(api.routes())
  .use(api.allowedMethods())
  .listen(process.env.PORT || 3000);
