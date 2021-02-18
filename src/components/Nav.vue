<template>
  <nav>
    <router-link class="item" to="/money">
      <Icon class="icon" name="money" />记账
    </router-link>
    <router-link class="item" to="/labels">
      <Icon class="icon" name="labels" />标签
    </router-link>
    <router-link class="item" to="/statistics">
      <Icon class="icon" name="statistics" />统计
    </router-link>
  </nav>
</template>

<script>
export default {
  name: "Nav",
};
</script>

<style lang="scss" scoped>
nav {
  border: 1px solid red;
  display: flex;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.25);
  font-size: 12px;
  > .item {
    width: 33.333333%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2px 0;
    .icon {
      height: 32px;
      width: 32px;
    }
  }
}
</style>
