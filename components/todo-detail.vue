<template>
  <section class="todo-detail">
    <div class="todo-left">
      <div class="todo-name">{{name}}</div>
    </div>
    <div class="todo-middle">
      <div>
        <div class="todo-createdAt">作成日: {{parsedCreatedAt}}</div>
        <div class="todo-deadline">〆切: {{parsedDeadline}}</div>
      </div>
    </div>
    <div class="todo-right">
      <button @click="updateStatus" :class="checked ? 'icon-heart-fill' : 'icon-heart-stroke'"></button>
    </div>

  </section>
</template>

<style scoped>
.todo-detail {
  color: white;
  padding: 20px 40px;
  border-top: 1px solid rgba(255,255,255,0.6);
  background: rgba(254,245,228,0.02);
  display: flex;
  justify-content: flex-start;
}
.todo-left {
  width: 350px;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 50px;
}
.todo-middle {
  display: flex;
  width: 230px;
  color: #ccc;
  align-content: center;
}
.todo-right {
  display: flex;
  align-items: center;
  padding-left: 50px;
}
.todo-right button {
  height: 48px;
  width: 48px;
  border: none;
  background: rgba(0,0,0,0.15);
  color: white;
  font-size: 22px;
  font-weight: 100;
}
.todo-right button.icon-heart-fill {
  color: #fc9bb4;
}
</style>

<script>
import dateFormat from '~assets/js/date-format';

export default {
  computed: {
    parsedDeadline() {
      return dateFormat(this.deadline);
    },
    parsedCreatedAt() {
      return dateFormat(this.createdAt);
    }
  },
  props: {
    tid: {
      required: true
    },
    name: {
      type: String,
      required: true
    },
    deadline: {
      type: Date,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true
    },
    checked: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    updateStatus() {
      this.$store.dispatch('todos/updateStatus', this.tid);
    }
  }
};
</script>
