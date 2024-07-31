import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const ProductSchema = mongoose.Schema({

    _id :Number,
    title:{
        type:String,
        lowercase:true,
        required:[true,"Title is required"],
        trim:true,
    },
    catnm:{
        type:String,
        lowercase:true,
        required:[true,"Category is required"],
        trim:true,
    },
    subcatnm:{
        type:String,
        lowercase:true,
        required:[true,"SubCategory is required"],
        trim:true,
    },
    description:{
        type:String,
        lowercase:true,
        required:[true,"Description is required"],
        trim:true,
    },
    piconnm:{
        type:String,
        required:[true,"Product Icon is required"],
        trim:true,
    },
    
    originalprize:{
       type:String,
       required:[true,"Prize is required"]
    },
    discountprize:{
        type:String,
        required:[true,"Prize is required"]
    },
    uid:String,
    info:String
});
ProductSchema.plugin(uniqueValidator);
const ProductSchemaModel = mongoose.model('product_collection',ProductSchema);
export default ProductSchemaModel;