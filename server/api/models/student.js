const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Model = mongoose.model;

const StudentSchema = new Schema({
    user_id : {type:mongoose.Types.ObjectId, ref:"user"},
    calendar :[{class: {type:mongoose.Types.ObjectId, ref:"class"}}]
})

export default Model("student",StudentSchema);