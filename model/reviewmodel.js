import mongoose from "mongoose";
import uniqueValidator from 'mongoose-unique-validator';

var reviewSchema = mongoose.Schema({
    _id:Number,
    pid : String,
    user_id:{
            type:String,
            trim:true,
    },
    description:{
        type:String,
        trim:true,
        required:[true,"Description must be written"],

    },
    info:String
});
reviewSchema.plugin(uniqueValidator);
const reviewSchemamodel = mongoose.model("review_collection",reviewSchema);
export default reviewSchemamodel;