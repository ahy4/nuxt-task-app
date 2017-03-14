<!-- todoリストのロゴと検索画面へのリンク -->

<template>
  <header>
    <nuxt-link to="/" tag="div" class="header-logo"><img src="~assets/img/icon.png" alt=""/></nuxt-link>
    <nuxt-link to="/search" tag="nav">- Search -</nuxt-link>
  </header>
</template>

<style scoped>
header {
  background: rgba(0,0,0,0.3);
  display: flex;
  justify-content: space-between;
  box-shadow: 0 15px 0 0 rgba(0,0,0,0.1);
}
.header-logo, nav {
  cursor: pointer;
}
nav {
  color: white;
  padding: 40px;
  margin-right: 80px;
}
</style>
