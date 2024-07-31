import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const userSchema = mongoose.Schema({
  _id: Number,
  name: {
    type: String,
    required: [true, "Name is Required"],
    lowercase: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is Required"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
    maxlength: 100,
    minlength: 5,
    trim: true,
  },
  mobile: {
    type: String,
    required: [true, "Mobile is Required"],
    maxlength: 10,
    minlength: 10,
    trim: true,
  },
  address: {
    type: String,
    required: [true, "Address is Required"],
    trim: true,
  },
  city: {
    type: String,
    required: [true, "City is Required"],
  },
  gender: {
    type: String,
    required: [true, "Gender is required"],
  },
  role: String,
  status: Number,
  info: String,
});

userSchema.plugin(uniqueValidator);
const userSchemaModel = mongoose.model("user_collection", userSchema);
export default userSchemaModel;
