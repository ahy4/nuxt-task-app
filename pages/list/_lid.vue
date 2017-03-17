<template>
  <main>
    <div class="spacer">
      {{$store.state.todos.listName}}
    </div>

    <div class="create-todo">
      <div class="create-todo-left">
        <input type="text" placeholder="ToDo名" v-model="name">
        <date-picker :date="date"></date-picker>
      </div>
      <div class="create-todo-right">
        <button @click="createTodo" class="icon-plus"></button>
      </div>
    </div>
    <todo-detail
      v-for="todo in $store.state.todos.todos"
      :name="todo.name"
      :deadline="new Date(todo.deadline)"
      :createdAt="new Date(todo.createdAt)"
      :completed="todo.completed === true"></todo-detail>
  </main>
</template>

<style scoped>
main {
  margin: 0 auto;
  width: 960px;
  font-family: 'Josefin Slab', 'M+ 1c light', "HiraginoSans-W2", "ヒラギノ角ゴシック W2", "メイリオ", "Meiryo", serif;
}
.create-todo {
  padding: 40px 100px;
  display: flex;
  justify-content: space-around;
}
.create-todo-left {
  width: 100%;
}
.create-todo-right {
  align-items: center;
  display: flex;
  padding-left: 20px;
}
.create-todo input[type="text"] {
  display: block;
  background: rgba(255,255,255, 0.07);
  border: none;
  font-size: 18px;
  width: 100%;
  height: 45px;
  line-height: 45px;
  padding: 0 30px;
  color: white;
  box-sizing: border-box;
  font-family: 'Josefin Slab', 'M+ 1c light', "HiraginoSans-W2", "ヒラギノ角ゴシック W2", "メイリオ", "Meiryo", serif;
  border-bottom: 1px dashed rgba(0,0,0,0.4);
}
.create-todo button {
  background: rgba(252,110,79,0.6);
  height: 60px;
  border: none;
  color: white;
  font-size: 40px;
  line-height: 60px;
  padding: 0 12px;
}
.spacer {
  height: 70px;
  line-height: 70px;
  font-size: 30px;
  text-align: center;
  color: white;
  border-bottom: 1px solid rgba(255,255,255,0.7);
  background: rgba(254,245,228,0.02);
}

</style>

<script>
import TodoDetail from '~components/todo-detail';
import DatePicker from 'vue-datepicker/vue-datepicker-es6.vue';
import validation from '~assets/js/api-validation';

export default {
  components: { TodoDetail, DatePicker },
  data: _ => ({
    name: '',
    date: {
      time: ''
    }
  }),
  async fetch({store, params}) {
    await store.dispatch('todos/initialize', params.lid);
  },
  methods: {
    async createTodo(e) {
      console.log(this.date.time);
      const sendData = {
        lid: this.$route.params.lid,
        name: this.name,
        deadline: +new Date(this.date.time.split`-`.join`/`),
        completed: false
      };
      let err = validation(sendData, 'Todo');
      if (!err) {
        try {
          console.log('lid:', this.$route.params.lid, typeof this.$route.params.lid);
          this.$store.dispatch('todos/add', {
            diff: sendData,
            lid: this.$route.params.lid
          });
        } catch (e) { err = e; }
      }
      if (err) console.log('err:', err);
    }
  }
};
</script>
