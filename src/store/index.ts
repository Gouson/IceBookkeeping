import clone from '@/lib/clone';
import createId from '@/lib/idCreator';
import router from '@/router';
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    tagList: [] as Tag[],
    recordList: [] as RecordItem[],
    currentTag: undefined,
    createRecordError: null
  } as RootState,
  mutations: {
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]');
    },
    createRecord(state, record: RecordItem) {
      const record2: RecordItem = clone(record);
      record2.createdAt = record2.createdAt || new Date().toISOString();
      state.recordList.push(record2);
      store.commit('saveRecords')
    },
    saveRecords(state) {
      window.localStorage.setItem('recordList'
        , JSON.stringify(state.recordList));
    },
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
      if (!state.tagList || state.tagList.length === 0) {
        store.commit('createTag', '衣')
        store.commit('createTag', '食')
        store.commit('createTag', '住')
        store.commit('createTag', '行')
      }
    },
    setCurrentTag(state, id: string) {
      state.currentTag = state.tagList.filter((t) => t.id === id)[0] as Tag;
    },
    createTag(state, name: string) {
      const message = ''
      const id = createId().toString()
      const names = state.tagList.map(item => item.name)
      if (names.indexOf(name) >= 0) {
        window.alert('标签重复');
        return
      }
      state.tagList.push({ id: id, name: name })
      store.commit('saveTags')
    },
    removeTag(state, id: string) {
      let index = -1;
      for (let i = 0; i < state.tagList.length; i++) {
        const element = state.tagList[i];
        if (element.id === id) {
          index = i;
          break;
        }
      }
      if (index >= 0) {
        state.tagList.splice(index, 1)
        store.commit('saveTags')
        router.back();
      } else {
        window.alert('删除失败')
      }
    },
    updateTag(state, payload: { id: string; name: string }) {
      const idList = state.tagList.map((item: any) => item.id)
      if (idList.indexOf(payload.id) >= 0) {
        const names = state.tagList.map((item: any) => item.name)
        if (names.indexOf(payload.name) >= 0) {
          return 'duplicated'
        } else {
          const tag = state.tagList.filter((item: any) => item.id === payload.id)[0]
          tag.name = payload.name
          store.commit('saveTags')
          return 'success'
        }
      } else {
        return 'not found'
      }
    },
    saveTags(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
    }
  }
})
export default store