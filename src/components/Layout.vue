<template>
  <div class="nav-wrapper">
    <div class="content" :class="classPrefix && `${classPrefix}-content`">
      <slot></slot>
    </div>
    <Nav />
  </div>
</template>

<script>
export default {
  props: ['classPrefix'],
  name: 'Layout'
};
</script>

<style lang="scss" scoped>
.nav-wrapper {
  background: #F5F5F5;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.content {
  overflow: auto;
  flex-grow: 1;
}
</style>
