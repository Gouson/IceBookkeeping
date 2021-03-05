<template>
  <div>
    <label class="notes">
      <span class="name">{{ this.fieldName }}</span>
      <template v-if="type === 'date'">
        <input
          :type="type"
          :value="x(value)"
          @input="onValueChanged($event.target.value)"
          :placeholder="placeholder"
        />
      </template>
      <template v-else>
        <input
          :type="type"
          :value="value"
          @input="onValueChanged($event.target.value)"
          :placeholder="placeholder"
        />
      </template>
    </label>
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs';
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
@Component
export default class FormItem extends Vue {
  @Prop({ default: '' }) value!: string;
  @Prop({ required: true }) fieldName!: string;
  @Prop() placeholder?: string;
  @Prop({ default: 'text' }) type?: string;
  onValueChanged(value: string) {
    this.$emit('update:value', value);
  }
  x(isoString: string) {
    return dayjs(isoString).format('YYYY-MM-DD');
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/style/helper.scss';
.notes {
  display: block;
  padding-left: 16px;
  display: flex;
  align-items: center;
  .name {
    padding-right: 16px;
  }
  input {
    height: 40px;
    flex-grow: 1;
    background: transparent;
    border: none;
    padding-right: 16px;
  }
}
</style>
