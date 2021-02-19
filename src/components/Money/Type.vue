<template>
  <div>
    <ul class="types">
      <li :class="type === '-' && 'selected'" @click="selectType('-')">支出</li>
      <li :class="type === '+' && 'selected'" @click="selectType('+')">收入</li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class Type extends Vue {
  @Prop(Number) xxx: number | undefined;
  //Prop 告诉Vue xxx不是data是prop
  //Number 告诉Vue xxx运行时是Number
  //xxx 属性名
  //number | undefined 告诉TS xxx编译时的类型
  type = "-";
  selectType(type: string) {
    if (type !== "-" && type !== "+") {
      throw new Error("Type is unknown");
    }
    this.type = type;
  }
}
// export default {
//   name: "Type",
//   data() {
//     return {
//       type: "-", // -表示支出，+代表收入
//     };
//   },
//   methods: {
//     selectType(type) {
//       if (type !== "-" && type !== "+") {
//         throw new Error("Type is unknown");
//       }
//       this.type = type;
//     },
//   },
// };
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.types {
  background: #c4c4c4;
  display: flex;
  font-size: 24px;
  > li {
    width: 50%;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &.selected::after {
      content: "";
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 4px;
      background: #333;
    }
  }
}
</style>
