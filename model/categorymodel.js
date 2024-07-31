import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const catSchema = mongoose.Schema({

    _id :Number,
    catnm:{
        type:String,
        lowercase:true,
        required:[true,"Category Name is required"],
        unique:true,
        trim:true,
    },
    caticonnm:{
        type:String,
        required:[true,"Category Icon is Required"],
},

});
catSchema.plugin(uniqueValidator);
const catSchemaModel = mongoose.model('category_collection',catSchema);
export default catSchemaModel;

