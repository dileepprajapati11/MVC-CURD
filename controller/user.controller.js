import "../model/connection.js";
import userSchemaModel from "../model/usermodel.js";
import jwt from "jsonwebtoken";
import randomString from "randomstring";
import url from "url";
// import { bcrypt } from "bcryptjs";
import bcrypt from "bcryptjs";

export var saveUser = async (req, res, next) => {
  var userDetails = req.body;
  console.log("User Deatils : " + userDetails);

  var userList = await userSchemaModel.find();
  console.log("User List : " + userList);

  var len = userList.length;
  console.log("Length of User List : " + len);

  var _id = len == 0 ? 1 : userList[len - 1]._id + 1;
  console.log("Id is : " + _id);

  const salt = await bcrypt.genSalt(10);
  console.log("salt", salt, userDetails.password);
  const hashedPassword = await bcrypt.hash(userDetails.password, salt);
  console.log("hashedPassword", hashedPassword);
  userDetails = {
    ...userDetails,
    _id: _id,
    status: 0,
    password: hashedPassword,
    role: "user",
    info: Date(),
  };
  console.log("Complete User Details is : " + userDetails);

  try {
    var user = await userSchemaModel.create(userDetails);
    console.log("User is : " + user);
    return res.status(201).json({ status: true });
  } catch (err) {
    return res.status(500).json({ satus: false, err: err.message });
  }
};

export var loginUser = async (req, res, next) => {
  var userDetails = req.body;
  console.log("User Deatils : " + userDetails);

  //userDetails = {...userDetails,"status":1};
  console.log("After Status User Deatils : " + JSON.stringify(userDetails));

  var userList = await userSchemaModel.find(userDetails);
  // console.log("After Find Method User List : "+userList);
  // console.log("After Find Method User List : "+userList.length);

  var len = userList.length;

  if (len != 0) {
    //  Before Token :
    // return res.status(201).json({"userDetails":userList[0]});

    //Token Generate :
    var payload = { subject: userList[0].email };
    var key = randomString.generate();
    var token = jwt.sign(payload, key);

    req.session.token = token;
    req.session.userDetails = userList[0];
    


    return res
      .status(201)
      .json({ status: true, token: token, userDetails: userList[0] });
  } else {
    return res
      .status(404)
      .json({ status: false, error: "Incorrect email or password" });
  }
};

export var otherRouteUser = async (req, res, next) => {
  if (req.session.token) {
    // Token is available in session
    console.log("Token:", req.session.token);
    console.log("User Details:", req.session.userDetails);

    // Proceed with your logic
    res.status(200).json({
      message: "You are authenticated",
      userDetails: req.session.userDetails,
    });
  } else {
    res.status(401).json({ message: "Unauthorized access" });
  }
};

export var fetchUser = async (req, res, next) => {
  var obj = url.parse(req.url, true).query;
  console.log(obj);

  var userList = await userSchemaModel.find(obj);
  console.log(userList);
  var len = userList.length;
  console.log("Length is : " + len);
  if (len != 0)
    return res.status(201).json({ status: true, usersList: userList });
  else return res.status(500).json({ result: "Server not Found" });
};

export var updateUser = (req, res, next) => {};

export var deleteUser = async (req, res, next) => {
  var id = req.body;
  console.log("id is : " + id);

  var user = await userSchemaModel.find(id);
  console.log("user Data is : " + user);

  if (user.length != 0) {
    let result = await userSchemaModel.deleteOne(id);
    console.log("Result is : " + result);

    if (result) {
      return res
        .status(201)
        .json({ status: true, message: "Record Delete Successfully" });
    } else {
      return res
        .status(500)
        .json({ status: false, message: "Record not Delete" });
    }
  } else {
    return res.satus(400).json({ message: "Resource not found" });
  }
};
