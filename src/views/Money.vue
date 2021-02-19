<template>
  <Layout class-prefix="layout">
    <NumberPad />
    <Type />
    <Notes />
    <Tags :dataSource.sync="tags" />
  </Layout>
</template>

<script>
import NumberPad from "@/components/Money/NumberPad.vue";
import Type from "@/components/Money/Type.vue";
import Notes from "@/components/Money/Notes.vue";
import Tags from "@/components/Money/Tags.vue";
export default {
  components: { NumberPad, Type, Notes, Tags },
  name: "Money",
  data() {
    return {
      tags: ["衣", "食", "住", "行", "娱乐"],
    };
  },
};
</script>
<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>
<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
</style>
