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
    <Tags />
  </Layout>
</template>

<script lang="ts">
import NumberPad from '@/components/Money/NumberPad.vue';
import Type from '@/components/Money/Type.vue';
import FormItem from '@/components/Money/FormItem.vue';
import Tags from '@/components/Money/Tags.vue';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
@Component({
  components: { NumberPad, Type, FormItem, Tags },
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
    amount: 0
  };
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }
  saveRecord() {
    this.$store.commit('createRecord', this.record);
  }
  created() {
    this.$store.commit('fetchRecords');
  }
}
</script>
<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
.notes {
  padding: 12px 0;
}
</style>
