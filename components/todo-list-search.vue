<template>
  <div class="todo-list-search">
    <div>{{name}}</div>
    <div>{{createdAt}}</div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      required: true
    }
  }
};
</script>
