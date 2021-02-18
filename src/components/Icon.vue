<template>
  <svg class="icon">
    <use :xlink:href="'#' + name" />
  </svg>
</template>

<script>
// import label from "@/assets/icons/label.svg";
// import money from "@/assets/icons/money.svg";
// import statistics from "@/assets/icons/statistics.svg";
import Icon from "@/components/Icon.vue";
// 引入整个文件夹
const importAll = (requireContext) =>
  requireContext.keys().forEach(requireContext);
try {
  importAll(require.context("../assets/icons", true, /\.svg$/));
} catch (error) {
  console.log(error);
}
export default {
  props: ["name"],
  name: "Icon",
};
</script>

<style lang="scss" scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
