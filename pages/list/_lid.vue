<template>
  <main>
    <h2>リスト名：{{$store.state.todos.listName}}</h2>
    <div class="create-todo">
      <div class="create-todo-left">
        <input type="text" placeholder="ToDo名" v-model="name">
        <input type="text" placeholder="期限" v-model="deadline">
      </div>
      <div class="create-todo-right">
        <button @click="createTodo">ついか</button>
      </div>
    </div>
    <todo-detail
      v-for="todo in $store.state.todos.todos"
      :name="todo.name"
      :deadline="todo.deadline"
      :createdAt="todo.createdAt"
      :completed="todo.completed"></todo-detail>
  </main>
</template>

<script>
import TodoDetail from '~components/todo-detail';
import validation from '~assets/js/api-validation';

export default {
  components: { TodoDetail },
  data: _ => ({
    name: '',
    deadline: ''
  }),
  async fetch({store, params}) {
    await store.dispatch('todos/initialize', params.lid);
  },
  methods: {
    async createTodo(e) {
      const sendData = {
        name: this.name,
        deadline: this.deadline,
        createdAt: new Date(),
        completed: false
      };
      let err = validation(sendData, 'Todo');
      if (!err) {
        try {
          this.$store.dispatch('todos/add', sendData);
        } catch (e) { err = e; }
      }
      if (err) console.log('err:', err);
    }
  }
};
</script>
