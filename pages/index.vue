<template>
  <main>
    <div class="create-list">
      <input type="text" v-model="name">
      <!-- asdf{{String(name)}} -->
      <button @click="createList"></button>
    </div>
    <div>{{JSON.stringify($store.state['todo-lists'].lists)}}</div>
    <list-overview
      v-for="list in $store.state['todo-lists'].lists"
      :lid="list._id"
      :name="list.name"
      :count="list.count"
      :checkCount="list.checkCount"
      :hasChild="list.hasChild"
      :deadline="list.deadline"></list-overview>
  </main>
</template>

<style scoped>

</style>

<script>
import ListOverview from '~components/list-overview.vue';
import validation from '~assets/js/api-validation.js';

export default {
  components: { ListOverview },
  // computed: {
  //   lists: _ => this.$store.state['todo-lists'].lists
  // },
  data: _ => ({ name: '' }),
  async fetch({store}) {
    await store.dispatch('todo-lists/initialize');
  },
  methods: {
    async createList(evt) {
      const sendData = { name: this.name };
      let err = validation(sendData, 'TodoList');
      if (!err) {
        try {
          this.$store.dispatch('todo-lists/add', sendData);
        } catch (e) { err = e; }
      }
      if (err) console.log('err:', err);
    }
  }
};
</script>
