<template>
  <nuxt-link tag="section" to="/test" class="list-overview">
    <div class="list-name">{{name}}</div>
    <div class="list-count">{{count}}</div>
    <div class="list-check-count">{{checkCount}}</div>
    <div class="list-deadline">{{deadline}}</div>
  </nuxt-link>
</template>

<style scoped>
.list-overview {
  cursor: pointer;
}
</style>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    count: {
      type: Number,
      required: true
    },
    checkCount: {
      type: Number,
      required: true
    },
    deadline: {
      type: String,
      required: false,
      default: _ => ''
    }
  },
  methods: {

  }
};
</script>
