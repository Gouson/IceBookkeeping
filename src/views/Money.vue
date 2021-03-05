<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord" />
    <Tabs :data-source="recordTypeList" :value.sync="record.type" />
    <div class="createdAt">
      <FormItem
        type="date"
        field-name="日期"
        placeholder="请输入日期"
        :value.sync="record.createdAt"
      />
    </div>
    <div class="notes">
      <FormItem
        field-name="备注"
        placeholder="请输入备注"
        :value.sync="record.notes"
      />
    </div>
    <Tags @update:value="updateTags" />
  </Layout>
</template>

<script lang="ts">
import NumberPad from '@/components/Money/NumberPad.vue';
import FormItem from '@/components/Money/FormItem.vue';
import Tags from '@/components/Money/Tags.vue';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import recordTypeList from '@/constants/recordTypeList';
import Tabs from '@/components/Tabs.vue';
@Component({
  components: { NumberPad, Tabs, FormItem, Tags },
  computed: {
    recordList() {
      return this.$store.state.recordList;
    }
  }
})
export default class Money extends Vue {
  record: RecordItem = {
    tags: [],
    notes: '',
    type: '+',
    amount: 0,
    createdAt: new Date().toISOString()
  };
  recordTypeList = recordTypeList;
  updateTags(value: []) {
    this.record.tags = value;
  }
  saveRecord() {
    if (!this.record.tags || this.record.tags.length === 0) {
      return window.alert('请选择至少一个标签');
    }
    this.$store.commit('createRecord', this.record);
    if (this.$store.state.createRecordError === null) {
      window.alert('已保存');
      this.record.notes = '';
    }
  }
  created() {
    this.$store.commit('fetchRecords');
  }
}
</script>
<style lang="scss" scoped>
::v-deep .layout-content {
  display: flex;
  flex-direction: column-reverse;
}
.notes {
  padding: 12px 0;
}
</style>
