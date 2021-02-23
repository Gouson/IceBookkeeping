<template>
  <svg class="icon">
    <use :xlink:href="'#' + name" @click="$emit('click', $event)" />
  </svg>
</template>

<script>
// 引入整个文件夹
const importAll = (requireContext) =>
  requireContext.keys().forEach(requireContext);
try {
  importAll(require.context('../assets/icons', true, /\.svg$/));
} catch (error) {
  console.log(error);
}
export default {
  props: ['name'],
  name: 'Icon'
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
