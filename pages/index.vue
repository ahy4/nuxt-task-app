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
      :lid="list.lid"
      :name="list.name"
      :count="list.count"
      :checkCount="list.checkCount"
      :deadline="list.deadline"></list-overview>
  </main>
</template>

<style scoped>

</style>

<script>
import ListOverview from '~components/list-overview.vue';
import axios from 'axios';
import validation from '~assets/js/api-validation.js';

export default {
  components: { ListOverview },
  computed: {
    lists() {
      return this.$store.state['todo-lists'].lists;
    }
  },
  data: ({store}) => ({ name: '' }),
  async fetch({ store, params }) {
    const {data} = await axios.get('http://localhost:3000/api/todo-list-overview');
    store.commit('todo-lists/update', data);
  },
  methods: {
    async createList(evt) {
      const sendData = { name: this.name };
      let err = validation(sendData, 'TodoList');
      if (!err) {
        try {
          let {data} = await axios.post('http://localhost:3000/api/todo-lists', sendData);
          data = Object.assign({
            count: 0,
            hasChild: false
          }, data);
          this.$store.commit('todo-lists/add', data);
        } catch (e) { err = e; }
      }
      if (err) console.log('err:', err);
    }
  }
};
</script>
