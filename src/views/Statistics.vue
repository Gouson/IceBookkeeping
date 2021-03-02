<template>
  <Layout>
    <Tabs
      class-prefix="type"
      :data-source="recordTypeList"
      :value.sync="type"
    />
    <Tabs
      class-prefix="interval"
      :data-source="intervalList"
      :value.sync="interval"
      :height="'48px'"
    />
    <div>type:{{ type }} inter:{{ interval }}</div>
  </Layout>
</template>

<script>
import Tabs from '@/components/Tabs';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import recordTypeList from '@/constants/recordTypeList';
import intervalList from '@/constants/intervalList';
@Component({
  components: { Tabs }
})
export default class Statistics extends Vue {
  type = '-';
  interval = 'day';
  intervalList = intervalList;
  recordTypeList = recordTypeList;
}
</script>

<style lang="scss" scoped>
::v-deep {
  .type-tabs-item {
    background: white;
    &.selected {
      background: #c4c4c4;
      &::after {
        display: none;
      }
    }
  }
  .interval-tabs-item {
    height: 48px;
  }
}
</style>
