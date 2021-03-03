import Vue from 'vue';
import Component from "vue-class-component";


@Component
export class TagHelper extends Vue {
  createTag() {
    const name = window.prompt('请输入标签名');
    if (name) {
      this.$store.commit('createTag', name);
      window.alert('已添加');
    }

  }
}
export default TagHelper