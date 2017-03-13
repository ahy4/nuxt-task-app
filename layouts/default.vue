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

@font-face {
  font-family: 'icomoon';
  src:  url('~assets/font/icomoon/icomoon.eot?m78wji');
  src:  url('~assets/font/icomoon/icomoon.eot?m78wji#iefix') format('embedded-opentype'),
    url('~assets/font/icomoon/icomoon.ttf?m78wji') format('truetype'),
    url('~assets/font/icomoon/icomoon.woff?m78wji') format('woff'),
    url('~assets/font/icomoon/icomoon.svg?m78wji#icomoon') format('svg');
  font-weight: normal;
  font-style: normal;
}

[class^="icon-"], [class*=" icon-"] {
  /* use !important to prevent issues with browser extensions that change fonts */
  font-family: 'icomoon' !important;
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;

  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-search:before {
  content: "\e900";
}
.icon-bookmark:before {
  content: "\e901";
}
.icon-cross:before {
  content: "\e902";
}
.icon-plus:before {
  content: "\e903";
}


</style>
