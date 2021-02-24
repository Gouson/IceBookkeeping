<template>
  <div class="tags">
    <div class="new">
      <button @click="createTag">新增标签</button>
    </div>
    <ul class="current">
      <li
        v-for="tag in tagsLists"
        :key="tag.id"
        @click="toggle(tag)"
        :class="{ selected: selectedTags.indexOf(tag) >= 0 }"
      >
        {{ tag.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import store from '@/store/index2';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
@Component
export default class Tags extends Vue {
  tagsLists = store.fetchTags();
  selectedTags: string[] = [];

  toggle(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
    this.$emit('update:value', this.selectedTags);
  }
  createTag() {
    const name = window.prompt('请输入标签名');
    if (!name) {
      return window.alert('标签名不能为空');
    }
    store.createTag(name);
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/style/helper.scss';
.tags {
  background: #fff;
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;
  font-size: 14px;
  padding: 16px;
  > .current {
    display: flex;
    flex-wrap: wrap;
    > li {
      $bg: #d9d9d9;
      background: $bg;
      $h: 24px;
      height: $h;
      line-height: $h;
      border-radius: $h/2;
      padding: 0 16px;
      margin-right: 12px;
      margin-top: 4px;
      &.selected {
        background: darken($bg, 50%);
        color: #fff;
      }
    }
  }
  > .new {
    padding-top: 16px;
    button {
      background: transparent;
      border: none;
      border-bottom: 1px solid;
      color: #999;
      padding: 0 4px;
    }
  }
}
</style>
