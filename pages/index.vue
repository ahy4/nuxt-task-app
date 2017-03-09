<template>
  <main>
    <div class="create-list">
      <input type="text" v-model="name">
      <!-- asdf{{String(name)}} -->
      <button @click="createList"></button>
    </div>
    <list-overview
      v-for="list in lists"
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

export default {
  components: { ListOverview },
  data: () => ({
    name: '',
    lists: [
      {name: 'tekitou name', count: 5, checkCount: 3, deadline: 'deadline time'},
      {name: 'tekitou name2', count: 7, checkCount: 3, deadline: 'deadline time'},
    ]
  }),
  methods: {
    createList(evt) {
      this.lists.push({name: 'tekitou name3', count: 7, checkCount: 3, deadline: 'deadline time'});
      alert('Hello ' + this.name + '!');
      // if (event) {
      //   alert(event.target.tagName);
      // }
    }
  }
};
</script>
