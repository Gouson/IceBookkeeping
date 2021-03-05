<template>
  <Layout>
    {{ groupedList }}
    <Tabs
      class-prefix="type"
      :data-source="recordTypeList"
      :value.sync="type"
    />
    <div class="chart-wrapper" ref="chartWrapper">
      <Chart class="chart" :options="chartOptions" />
    </div>
    <div class="noContent" v-if="groupedList.length === 0">木有收支记录哦</div>
    <ol>
      <li v-for="(group, index) in groupedList" :key="index">
        <h3 class="title">
          {{ beautify(group.title) }}<span>￥{{ group.total }}</span>
        </h3>
        <ol>
          <li class="record" v-for="item in group.items" :key="item.id">
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
import dayjs from 'dayjs';
import clone from '@/lib/clone';
import Chart from '../components/Chart.vue';
import _ from 'lodash';
@Component({
  components: { Tabs, Chart }
})
export default class Statistics extends Vue {
  get recordList() {
    return (this.$store.state as RootState).recordList;
  }
  get groupedList() {
    const { recordList } = this;
    if (recordList.length === 0) {
      return [];
    }

    const newList = clone(recordList)
      .filter((r) => r.type === this.type)
      .sort((a, b) => {
        return dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf();
      });
    if (newList.length === 0) {
      return [] as Result;
    }
    type Result = {
      title: string;
      total?: number;
      items: RecordItem[];
    }[];
    const result: Result = [
      {
        title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'),
        items: [newList[0]]
      }
    ];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
        last.items.push(current);
      } else {
        result.push({
          title: dayjs(current.createdAt).format('YYYY-MM-DD'),
          items: [current]
        });
      }
    }
    result.map((group) => {
      group.total = group.items.reduce((sum, item) => sum + item.amount, 0);
    });
    return result;
  }
  tagString(tags: Tag[]) {
    const x = tags.map((item) => item.name);
    return x.length === 0 ? '无' : x.join(' | ');
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
  mounted() {
    const div = this.$refs.chartWrapper as HTMLDivElement;
    div.scrollLeft = div.scrollWidth;
  }
  type = '-';
  recordTypeList = recordTypeList;
  get keyValuesList() {
    const array = [];
    for (let i = 0; i <= 29; i++) {
      const dateString = dayjs(new Date())
        .subtract(i, 'day')
        .format('YYYY-MM-DD');
      const found = _.find(this.groupedList, {
        title: dateString
      });
      array.push({
        key: dateString,
        value: found ? found.total : 0
      });
    }
    array.sort((a, b) => {
      if (dayjs(a.key).isAfter(dayjs(b.key))) {
        return 1;
      } else if (a.key === b.key) {
        return 0;
      } else {
        return -1;
      }
    });

    return array;
  }
  get chartOptions() {
    const keys = this.keyValuesList.map((item) => item.key);
    const values = this.keyValuesList.map((item) => item.value);
    return {
      grid: {
        left: 0,
        right: 0
      },
      tooltip: {
        show: true,
        triggerOn: 'click',
        formatter: '{c}',
        position: 'top'
      },

      xAxis: {
        data: keys,
        axisTick: {
          alignWithLabel: true
        },
        axisLabel: {
          formatter: function (value: string) {
            return value.substr(5);
          }
        }
      },
      yAxis: {
        show: false
      },
      series: [
        {
          type: 'line',
          data: values,
          itemStyle: {
            borderWidth: 1,
            color: '#666',
            borderColor: '#666'
          },
          symbolSize: 12,
          symbol: 'circle'
        }
      ]
    };
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  .type-tabs-item {
    background: #c4c4c4;
    &.selected {
      background: white;
      &::after {
        display: none;
      }
    }
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
.noContent {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
}
.chart {
  width: 400%;
  &-wrapper {
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
