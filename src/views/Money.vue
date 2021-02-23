<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord" />
    <Type :value.sync="record.type" />
    <div class="notes">
      <FormItem
        field-name="备注"
        placeholder="请输入备注"
        @update:value="onUpdateNotes"
      />
    </div>

    <Tags :dataSource.sync="tags" @update:value="onUpdateTags" />
  </Layout>
</template>

<script lang="ts">
import NumberPad from '@/components/Money/NumberPad.vue';
import Type from '@/components/Money/Type.vue';
import FormItem from '@/components/Money/FormItem.vue';
import Tags from '@/components/Money/Tags.vue';
import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import { recordListModel } from '@/models/recordListModel';
import { tagListModel } from '@/models/tagListModel';
const recordList = recordListModel.fetch();
@Component({
  components: { NumberPad, Type, FormItem, Tags }
})
export default class Money extends Vue {
  tags = window.tagList;
  recordList = recordList;
  record: RecordItem = {
    tags: [],
    notes: '',
    type: '+',
    amount: 0
  };
  onUpdateTags(value: string[]) {
    this.record.tags = value;
  }
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }
  saveRecord() {
    recordListModel.create(this.record);
  }
  @Watch('recordList')
  onRecordListChange() {
    recordListModel.save();
  }
}
</script>
<style lang="scss" >
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
.notes {
  padding: 12px 0;
}
</style>