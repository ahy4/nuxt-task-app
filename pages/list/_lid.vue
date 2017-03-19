<template>
  <main>
    <div class="spacer">
      {{$store.state.todos.listName}}
    </div>
    <div class="create-todo">
      <div class="wrap">
        <div class="create-todo-left">
          <input type="text" placeholder="ToDo名" v-model="name" @keyup="checkValidity" @keyup.enter="createTodo">
          <date-picker :date="date" :option="datePickerOption"></date-picker>
        </div>
        <div class="create-todo-right">
          <button @click="createTodo" class="icon-plus"></button>
        </div>
        <div class="error-log">
          {{ errorMessage }}
        </div>
      </div>
    </div>
    <div>
      <div class="result" v-if="$store.state.todos.todos.length === 0">
        登録されたTODOはございません
      </div>
      <todo-detail
        v-else
        v-for="todo in $store.state.todos.todos"
        :tid="Number(todo._id)"
        :name="todo.name"
        :deadline="new Date(todo.deadline)"
        :createdAt="new Date(todo.createdAt)"
        :checked="todo.checked === true"></todo-detail>
    </div>
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
  padding-left: 20px;
}
.wrap {
  justify-content: center;
  align-items: center;
  display: flex;
  position: relative;
  width: 100%;
}
.wrap > .error-log {
  position: absolute;
  top: 105%;
  color: #fc9bb4;
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
.result {
  color: white;
  padding: 20px 40px;
  border-top: 1px solid rgba(255,255,255,0.6);
  background: rgba(254,245,228,0.1);
  display: flex;
  justify-content: flex-start;
}
</style>

<script>
import TodoDetail from '~components/todo-detail';
import DatePicker from 'vue-datepicker/vue-datepicker-es6.vue';
import validation from '~assets/js/api-validation';

const datePickerOption = {
  placeholder: '期限',
  type: 'day',
  week: '月火水木金土日'.split``,
  month: Array.from({length: 12}, (_, i) => (i + 1) + '月'),
  format: 'YYYY-MM-DD'
};

export default {
  components: { TodoDetail, DatePicker },
  data: _ => ({
    name: '',
    date: {
      time: ''
    },
    errorMessage: '',
    datePickerOption
  }),
  async fetch({store, params}) {
    await store.dispatch('todos/initialize', params.lid);
  },
  methods: {
    async checkValidity() {
      const data = {
        lid: this.$route.params.lid,
        name: this.name,
        deadline: +new Date(this.date.time.split`-`.join`/`),
        checked: false
      };
      let err = validation(data, 'Todo');
      if (err) {
        this.errorMessage = Array.prototype.concat.apply([], Object.keys(err).map(k => err[k])).join('　');
      } else {
        const isUnique = !!this.$store.state.todos.todos.find((todo) => todo.name === this.name);
        this.errorMessage = isUnique ? '既にそのTODO名は登録されています' : '';
      }
      console.log(this.errorMessage);
    },
    async createTodo(e) {
      const sendData = {
        lid: this.$route.params.lid,
        name: this.name,
        deadline: +new Date(this.date.time.split`-`.join`/`),
        checked: false
      };
      let err = validation(sendData, 'Todo');
      if (!err) {
        try {
          this.$store.dispatch('todos/add', {
            diff: sendData,
            lid: this.$route.params.lid
          });
          this.date.time = '';
          this.name = '';
        } catch (e) { err = e; }
      }
      if (err) console.log('err:', err);
    }
  }
};
</script>
