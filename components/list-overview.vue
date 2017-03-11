<template>
  <nuxt-link tag="section" :to="`/list/${this.lid}`" class="list-overview">
    lid: {{lid}}
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
    lid: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    count: {
      type: Number
    },
    checkCount: {
      type: Number
    },
    deadline: {
      type: String,
      // required: false,
      // default: _ => ''
    }
  },
  methods: {

  }
};
</script>
