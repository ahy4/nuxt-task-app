<template>
  <main>
    <div class="spacer"></div>
    <div class="search-box">
      <div class="wrap">
        <input type="text" v-model="query" @keyup.enter="search">
        <button @click="search" class="icon-search"></button>
      </div>
    </div>
    <div class="search-todos">
      <div class="result">
        <p v-if="$store.state.search.todos.length === 0">対称のTODOは見つかりません</p>
        <p v-else>
          {{$store.state.search.todos.length}}件のTODOが見つかりました
        </p>
      </div>
      <todo-search
        v-for="todo in $store.state.search.todos.concat().reverse()"
        :lid="Number(todo.lid)"
        :name="todo.name"
        :listName="todo.listName"
        :createdAt="new Date(todo.createdAt)"
        :deadline="new Date(todo.deadline)"></todo-search>
    </div>
    <div class="search-lists">
      <div class="result">
      <p v-if="$store.state.search.lists.length === 0">対称のTODOリストは見つかりません</p>
      <p v-else>
        {{$store.state.search.lists.length}}件のTODOリストが見つかりました
      </p>
      </div>
      <todo-list-search
        v-for="list in $store.state.search.lists.concat().reverse()"
        :name="list.name"
        :createdAt="new Date(list.createdAt)"></todo-list-search>
    </div>
  </main>
</template>

<style scoped>
main {
  margin: 0 auto;
  width: 960px;
  font-family: 'Josefin Slab', 'M+ 1c light', "HiraginoSans-W2", "ヒラギノ角ゴシック W2", "メイリオ", "Meiryo", serif;
}
.search-box {
  padding: 40px 100px;
}
.wrap {
  display: flex;
  justify-content: center;
  border-bottom: 1px dashed #ccc;
}
.search-box input[type="text"] {
  display: block;
  background: rgba(255,255,255, 0.07);
  border: none;
  font-size: 26px;
  width: 100%;
  height: 60px;
  line-height: 60px;
  padding: 0 30px;
  color: white;
  box-sizing: border-box;
  font-family: 'Josefin Slab', 'M+ 1c light', "HiraginoSans-W2", "ヒラギノ角ゴシック W2", "メイリオ", "Meiryo", serif;
}
.search-box button {
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
import TodoSearch from '~components/todo-search.vue';
import TodoListSearch from '~components/todo-list-search.vue';
import notify from '~assets/js/notify';

notify();

export default {
  components: { TodoSearch, TodoListSearch },
  data: _ => ({ query: '' }),
  async fetch({store}) {
    await store.dispatch('search/exec', '');
  },
  methods: {
    async search(evt) {
      this.$store.dispatch('search/exec', this.query);
    }
  }// 次にコンポーネントの整備。todosのトグルの送信。それが終わったらデザインにいける
};

</script>
