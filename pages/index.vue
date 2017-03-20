<template>
  <main>
    <div class="spacer"></div>
    <div class="create-list">
      <div class="wrap">
        <input type="text" placeholder="create new TODO LIST" v-model="name" @keyup="startValidation" @keyup.enter="createList">
        <button @click="createList" class="icon-plus"></button>
        <div class="error-log">
          {{ errorMessage }}
        </div>
      </div>
    </div>
    <list-overview
      v-for="list in $store.state['todo-lists'].lists"
      :lid="list._id"
      :name="list.name"
      :count="list.count"
      :checkedCount="list.checkedCount"
      :hasChild="list.hasChild"
      :deadline="new Date(list.deadline)"></list-overview>
  </main>
</template>

<style scoped>
main {
  margin: 0 auto;
  width: 960px;
  font-family: 'Josefin Slab', 'M+ 1c light', "HiraginoSans-W2", "ヒラギノ角ゴシック W2", "メイリオ", "Meiryo", serif;
}
.create-list {
  padding: 40px 100px;
}
.wrap {
  display: flex;
  justify-content: center;
  border-bottom: 1px dashed #ccc;
  position: relative;
}
.wrap > .error-log {
  position: absolute;
  top: 105%;
  color: #fc9bb4;
}
.create-list input[type="text"] {
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
.create-list button {
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

</style>

<script>
import ListOverview from '~components/list-overview.vue';
import validation from '~assets/js/api-validation.js';

export default {
  components: { ListOverview },
  computed: {
    errorMessage() {
      if (!this.validationStarted) return '';
      let err = validation({name: this.name}, 'TodoList');
      let errorMessages = '';
      if (err) {
        errorMessages += Array.prototype.concat.apply([], Object.keys(err).map(k => err[k])).join('　') + '　';
      }
      const isUnique = !!this.$store.state['todo-lists'].lists.find((list) => list.name === this.name);
      errorMessages += isUnique ? '既にそのTODOリスト名は登録されています' : '';
      return errorMessages;
    }
  },
  data: _ => ({
    name: '',
    validationStarted: false
  }),
  async fetch({store}) {
    await store.dispatch('todo-lists/initialize');
  },
  methods: {
    startValidation() {
      this.validationStarted = true;
    },
    async createList(evt) {
      const sendData = { name: this.name };
      let err = this.errorMessage;
      if (!err) {
        try {
          await this.$store.dispatch('todo-lists/add', sendData);
          this.name = '';
          this.validationStarted = false;
        } catch (e) { err = e; }
      }
      if (err) console.error('error:', err);
    }
  }
};
</script>
