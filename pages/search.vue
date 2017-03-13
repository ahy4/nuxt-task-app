<template>
  <main>
    <div class="search-box">
      <input type="text" v-model="query">
      <button @click="search"></button>
    </div>
    <!-- <div>{{JSON.stringify($store.state.search.todos)}}</div> -->
    <div class="search-todos">
      <p>{{$store.state.search.todos.length}}件のTODOが見つかりました</p>
      <todo-search
        v-for="list in $store.state.search.todos"
        :name="list.name"
        :listName="list.listName"
        :createdAt="list.createdAt"
        :deadline="list.deadline"></todo-search>
    </div>
    <div>{{JSON.stringify($store.state.search.lists)}}</div>
    <div class="search-lists">
      <p>{{$store.state.search.lists.length}}件のTODOリストが見つかりました</p>
      <todo-list-search
        v-for="list in $store.state.search.todos"
        :name="list.name"
        :createdAt="list.createdAt"></todo-list-search>
    </div>
  </main>
</template>

<style scoped>

</style>

<script>
import TodoSearch from '~components/todo-search.vue';
import TodoListSearch from '~components/todo-list-search.vue';

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
