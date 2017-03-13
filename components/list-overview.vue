<template>
  <nuxt-link tag="section" :to="`/list/${this.lid}`" class="list-overview">
    <div class="has-child" v-if="hasChild">
      lid: {{lid}}
      <div class="list-name">{{name}}</div>
      <div class="list-count">{{count}}</div>
      <div class="list-check-count">{{checkCount}}</div>
      <div class="list-deadline">{{deadline}}</div>
    </div>
    <div class="has-no-child" v-else>
      lid: {{lid}}
      <div class="list-name">{{name}}</div>
    </div>
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
    hasChild: {
      type: Boolean,
      required: true
    },
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
      type: Date,
      // required: false,
      // default: _ => ''
    }
  },
  methods: {

  }
};
</script>
