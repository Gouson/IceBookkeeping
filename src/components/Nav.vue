<template>
  <nav>
    <router-link class="item" active-class="selected" to="/money">
      <Icon class="icon" name="money1" />记账
    </router-link>
    <router-link class="item" active-class="selected" to="/labels">
      <Icon class="icon" name="labels1" />标签
    </router-link>
    <router-link class="item" active-class="selected" to="/statistics">
      <Icon class="icon" name="statistics1" />统计
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
    color: #666666;
    .icon {
      height: 32px;
      width: 32px;
    }
  }
  > .item.selected {
    color: red;
  }
}
</style>
