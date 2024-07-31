import mongoose from "mongoose";
import uniqueValidator from 'mongoose-unique-validator';
var subcatSchema = mongoose.Schema({
    _id:Number,
    catnm:{
        type:String,
        required:[true,"Category Name is Required"],
        lowercase:true,
        trim:true,
        //unique:true,
    },
    subcatnm:{
        type:String,
        required:[true,"SubCategory name is required"],
        trim:true,
    },
    subcaticonnm:{
        type:String,
        trim:true,
        required:[true,"Subcategory Icon is required"],
    }

});
subcatSchema.plugin(uniqueValidator);
const subcatModel = mongoose.model("subcategory_collection",subcatSchema);
export default subcatModel;
