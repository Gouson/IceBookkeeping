<template>
  <div class="wrapper" ref="wrapper">123</div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import echarts, { EChartOption } from 'echarts';
import Vue from 'vue';
@Component
export default class Chart extends Vue {
  @Prop() options?: EChartOption;
  mounted() {
    if (this.options === undefined) {
      return console.error('options undefined');
    }
    const chart = echarts.init(this.$refs.wrapper as HTMLDivElement);
    chart.setOption(this.options!);
  }
}
</script>

<style scoped>
.wrapper {
  height: 400px;
}
</style>