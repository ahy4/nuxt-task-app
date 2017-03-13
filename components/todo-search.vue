<template>
  <div class="todo-search">
    <div>{{name}}</div>
    <div>{{listName}}</div>
    <div>{{createdAt}}</div>
    <div>{{deadline}}</div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    listName: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      required: true
    },
    deadline: {
      type: Date,
      required: true
    }
  }
};
</script>
