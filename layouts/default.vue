<template>
  <div class="wrapper">
    <custom-header/>
    <nuxt/>
  </div>
</template>

<script>
import CustomHeader from '~components/header.vue';
export default {
  components: { CustomHeader },
};
</script>

<style>
.wrapper {
  background: url('~assets/img/bg.png');
  min-height: 100vh;
}
</style>
