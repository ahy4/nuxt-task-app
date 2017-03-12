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
import axios from 'axios';
import validation from '~assets/js/api-validation';

export default {
  components: { TodoDetail },
  data: _ => ({
    name: '',
    deadline: ''
  }),
  async fetch({store, params}) {
    await store.dispatch('todos/initialize', params.lid);
    // await store.dispatch('todos/update', params.lid);
    // const listRes = await axios.get(`http://localhost:3000/api/todo-lists/${params.lid}`);
    // store.commit('todos/listName', listRes.data);
    // const {data} = await axios.get(`http://localhost:3000/api/todo-lists/${params.lid}/todos`);
    // store.commit('todos/update', data);
  },
  methods: {
    async createTodo(e) {
      const sendData = {
        name: this.name,
        deadline: this.deadline,
        createdAt: new Date(),
        completed: false
      };
      console.log(this.name, this.deadline);
      let err = validation(sendData, 'Todo');
      if (!err) {
        try {
          let {data} = await axios.post(`http://localhost:3000/api/todo-lists/${this.$route.params.lid}/todos`, sendData);
          this.$store.commit('todos/add', data);
        } catch (e) { err = e; }
      }
      if (err) console.log('err:', err);
    }
  }
};
</script>
