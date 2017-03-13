<template>
  <main>
    <div class="spacer"></div>
    <div class="create-list">
      <input type="text" placeholder="create new TODO LIST" v-model="name">
      <button @click="createList" class="icon-plus"></button>
    </div>
    <list-overview
      v-for="list in $store.state['todo-lists'].lists"
      :name="list.name"
      :count="list.count"
      :checkCount="list.checkCount"
      :hasChild="list.hasChild"
      :deadline="list.deadline"></list-overview>
  </main>
</template>

<style scoped>
main {
  margin: 0 auto;
  width: 960px;
}
.create-list {
  background: transparent;
  border-top: 1px solid white;
  padding: 40px 70px;
  display: flex;
  justify-content: center;
}
.create-list input[type="text"] {
  display: block;
  background: rgb(255,235,225);
  border: none;
  font-size: 26px;
  width: 600px;
  height: 60px;
  line-height: 60px;
  padding: 0 30px;
}
.create-list button {
  background: #FC6E4F;
  height: 60px;
  border: none;
  color: white;
  font-size: 40px;
  line-height: 60px;
  padding: 0 12px;
}
.spacer {
  height: 70px;
  background: rgba(254,245,228,0.1);
}
</style>

<script>
import ListOverview from '~components/list-overview.vue';
import validation from '~assets/js/api-validation.js';

export default {
  components: { ListOverview },
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
        this.name = '';
      }
      if (err) console.log('err:', err);
    }
  }
};
</script>
