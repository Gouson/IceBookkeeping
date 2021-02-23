
import clone from "@/lib/clone";

const localStorageKeyName = 'recordList'
const recordStore = {
    //recored store
    recordList: [] as RecordItem[],
    fetchRecords() {
        this.recordList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
        return this.recordList
    },
    save() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.recordList));
    },
    createRecord(record: RecordItem) {
        const record2: RecordItem = clone(record);
        record2.createdAt = new Date();
        this.recordList && this.recordList.push(record2);
        this.save()
    }
}
recordStore.fetchRecords()
export default recordStore