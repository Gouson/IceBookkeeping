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
    />

    <ol>
      <li v-for="(group, name) in result" :key="name">
        <h3 class="title">{{ beautify(name) }}</h3>
        <ol>
          <li class="record" v-for="item in group" :key="item.id">
            <span>{{ tagString(item.tags) }}</span>
            <span class="notes">{{ item.notes }}</span>
            <span>￥{{ item.amount }}</span>
          </li>
        </ol>
      </li>
    </ol>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constants/recordTypeList';
import intervalList from '@/constants/intervalList';
import dayjs from 'dayjs';
@Component({
  components: { Tabs }
})
export default class Statistics extends Vue {
  get recordList() {
    return (this.$store.state as RootState).recordList;
  }
  get result() {
    const { recordList } = this;
    const hashTable: { [key: string]: RecordItem[] } = {};
    for (let i = 0; i < recordList.length; i++) {
      const [date] = recordList[i].createdAt!.split('T');
      hashTable[date] = hashTable[date] || [];
      hashTable[date].push(recordList[i]);
    }
    return hashTable;
  }
  tagString(tags: Tag[]) {
    return tags.length === 0 ? '无' : tags.join('|');
  }
  beautify(string: string) {
    if (dayjs(string).isSame(dayjs(), 'day')) {
      return '今天';
    } else if (dayjs(string).isSame(dayjs().subtract(1, 'day'), 'day')) {
      return '昨天';
    } else if (dayjs(string).isSame(dayjs(), 'year')) {
      return dayjs(string).format('MM月DD日');
    } else {
      return dayjs(string).format('YYYY年MM月DD日');
    }
  }
  beforeCreate() {
    this.$store.commit('fetchRecords');
  }
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
%item {
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title {
  @extend %item;
}
.record {
  background: white;
  @extend %item;
}
.notes {
  margin-right: auto;
  margin-left: 16px;
  color: #999;
}
</style>
