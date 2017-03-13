<template>
  <nuxt-link tag="section" :to="`/list/${this.lid}`" class="list-overview">
    <div class="has-child" v-if="hasChild">
      <div class="list-name">{{name}}</div>
      <div class="list-count">{{count}}</div>
      <div class="list-check-count">{{checkCount}}</div>
      <div class="list-deadline">{{deadline}}</div>
    </div>
    <div class="has-no-child" v-else>
      <div class="list-name">{{name}}</div>
    </div>
  </nuxt-link>
</template>

<style scoped>
.list-overview {
  cursor: pointer;
  color: white;
  padding: 20px 40px;
  border-top: 1px solid #fff;
  background: rgba(254,245,228,0.1);
}
</style>

<script>
export default {
  props: {
    hasChild: {
      type: Boolean,
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
