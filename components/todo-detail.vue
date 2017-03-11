<template>
  <section class="todo-detail">
    <div class="todo-right">
      <div class="todo-name">{{name}}</div>
      <div class="todo-createdAt">{{createdAt}}</div>
      <div class="todo-deadline">{{deadline}}</div>
    </div>
    <div class="todo-left">
      <button @click="updateCompleted">{{String(completedState)}}</button>
    </div>

  </section>
</template>

<style scoped>
</style>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    deadline: {
      type: Date,
      required: false,
      default: _ => ''
    },
    createdAt: {
      type: Date,
      required: true
    },
    completed: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      completedState: this.completed
    };
  },
  methods: {
    updateCompleted() {
      this.completedState = !this.completedState;
    }
  }
};
</script>
