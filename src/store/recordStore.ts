import { recordListModel } from "@/models/recordListModel";

export default {
    //recored store
    recordList: recordListModel.fetch(),
    createRecord: (record: RecordItem) => recordListModel.create(record),

}