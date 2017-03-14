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
    font-family: 'M+ 1c light';
    src: url('~assets/font/mplus/mplus-1c-light-sub.eot');
    src: url('~assets/font/mplus/mplus-1c-light-sub.eot?#iefix') format('embedded-opentype'),
    url('~assets/font/mplus/mplus-1c-light-sub.woff') format('woff'),
    url('~assets/font/mplus/mplus-1c-light-sub.ttf') format('truetype');
}
@font-face {
  font-family: 'Josefin Slab';
  font-style: normal;
  font-weight: 400;
  src: local('Josefin Slab'), local('JosefinSlab'), url(https://fonts.gstatic.com/s/josefinslab/v6/46aYWdgz-1oFX11flmyEfRampu5_7CjHW5spxoeN3Vs.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
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
