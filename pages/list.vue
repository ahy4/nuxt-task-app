<template>
  <main>
    <div class="create-todo">
      <div class="create-todo-left">
        <input type="text" placeholder="ToDo名" v-model="name">
        <input type="text" placeholder="期限" v-model="deadline">
      </div>
      <div class="create-todo-right">
        <button @click="createTodo">ついか</button>
      </div>
      <todo-detail
        v-for="todo in todos"
        :name="todo.name"
        :deadline="todo.deadline"
        :createdAt="todo.createdAt"
        :completed="todo.completed"></todo-detail>
    </div>
  </main>
</template>

<script>
import TodoDetail from '~components/todo-detail';
export default {
  components: { TodoDetail },
  data: _ => ({
    name: '',
    deadline: '',
    todos: [
      { name: 'testTODO', deadline: 'test deadline', createdAt: new Date().toString(), completed: false },
      { name: 'testTODO2', deadline: 'test deadline', createdAt: new Date().toString(), completed: true }
    ]
  }),
  methods: {
    createTodo(e) {
      this.todos.push({
        name: this.name,
        deadline: this.deadline,
        createdAt: new Date().toString(),
        completed: false
      });
      console.log(this.name, this.deadline);
    }
  }
};
</script>
