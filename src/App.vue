<template>
  <div class="app">
    <router-view />
  </div>
</template>
<style lang="scss">
@import '~@/assets/style/reset.scss';
@import '~@/assets/style/helper.scss';
#app {
  line-height: 1.5;
  font-family: $font-hei;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
}
.app {
  max-width: 500px;
  margin: 0 auto;
}
</style>
