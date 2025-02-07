import mongoose from "mongoose";
const Schema = mongoose.Schema;

const jobSchema = new Schema({
    title: {type: String, required: true}, 
    content:{type: String, required: true},
    company: {type: String, default: ""},
    userId: {type: String, required: true},
    createdOn: {type: Date, default: new Date().getTime()}, 
});


export default mongoose.model("Job", jobSchema); 