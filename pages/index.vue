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
export default {
  components: { ListOverview },
  computed: {
    lists() {
      return this.$store.state['todo-lists'].lists;
    }
  },
  data: ({store}) => {
    // console.log(store.state['todo-lists'].lists);
    return {
      name: ''
    };
  },
  async fetch({ store, params }) {
    const {data} = await axios.get('http://localhost:3000/api/todo-list-overview');
    store.commit('todo-lists/update', data);
    // return axios
    //   .get('http://localhost:3000/api/todo-list-overview')
    //   .then(({data}) => {
    //     console.log('data:', data);
    //     store.commit('todo-lists/update', data);
    //   });
  },
  methods: {
    createList(evt) {
      // this.lists.push({name: 'tekitou name3', count: 7, checkCount: 3, deadline: 'deadline time'});
      this.$store.commit('todo-lists/add', {name: 'tekitou name3', count: 7, checkCount: 3, deadline: 'deadline time'});
    }
  }
};
</script>
