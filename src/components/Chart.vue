<template>
  <div class="wrapper" ref="wrapper">123</div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator';
import echarts, { EChartOption, ECharts } from 'echarts';
import Vue from 'vue';
@Component
export default class Chart extends Vue {
  @Prop() options?: EChartOption;
  chart?: ECharts;
  mounted() {
    if (this.options === undefined) {
      return console.error('options undefined');
    }
    this.chart = echarts.init(this.$refs.wrapper as HTMLDivElement);
    this.chart.setOption(this.options!);
  }
  @Watch('options')
  onOptionsChnage(newValue: EChartOption) {
    this.chart!.setOption(newValue);
  }
}
</script>

<style scoped>
.wrapper {
  height: 400px;
}
</style>