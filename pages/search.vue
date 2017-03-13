<template>
  <main>
    <div class="search-box">
      <input type="text" v-model="query">
      <!-- asdf{{String(name)}} -->
      <button @click="search"></button>
    </div>
    <div>{{JSON.stringify($store.state.search.lists)}}</div>
    <div class="search-todos">
<!--       <todo-search
        v-for="list in $store.state.search.todos"
        :lid="list._id"
        :name="list.name"
        :count="list.count"
        :checkCount="list.checkCount"
        :hasChild="list.hasChild"
        :deadline="list.deadline"></todo-search> -->
    </div>
    <div class="search-lists">
<!--       <todo-list-search
        v-for="list in $store.state.search.todos"
        :lid="list._id"
        :name="list.name"
        :count="list.count"
        :checkCount="list.checkCount"
        :hasChild="list.hasChild"
        :deadline="list.deadline"></todo-list-search> -->
    </div>
  </main>
</template>

<style scoped>

</style>

<script>
export default {
  components: {},
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
