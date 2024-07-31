import "../model/connection.js";
import subCategorySchemaModel from "../model/subcategorymodel.js";
import url from "url";
import randromString from "randomstring";
import path from "path";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

export var saveSubCategory = async (req, res, next) => {
  var subcatDetails = req.body;
  console.log("Sub Category Details : " + JSON.stringify(subcatDetails));

  var caticon = req.files.caticon;
  console.log("Cat icon : " + caticon);
  console.log("--------------------1");

  var subcatList = await subCategorySchemaModel.find();
  var len = subcatList.length;
  console.log("sub category length is : " + len);
  console.log("--------------------2");

  var _id = len == 0 ? 1 : subcatList[len - 1]._id + 1;
  console.log("id is :" + _id);
  console.log("--------------------3");

  var subcaticonnm =
    Date.now() + "-" + randromString.generate() + "-" + caticon.name;
  console.log("Sub category Icon Name : " + subcaticonnm);
  console.log("--------------------4");

  subcatDetails = { ...subcatDetails, _id: _id, subcaticonnm: subcaticonnm };
  console.log("Sub Cat Deatils : " + JSON.stringify(subcatDetails));
  console.log("--------------------5");

  try {
    var data = await subCategorySchemaModel.create(subcatDetails);
    console.log("-------------------6");
    var uploadpath = path.join(
      __dirname,
      "../../demo_ui/public/Upload/Sub_Cat_Icon",
      subcaticonnm
    );
    console.log("-------------------7");
    caticon.mv(uploadpath);
    console.log("--------------------8");
    console.log("data is : " + data);
    console.log("--------------------9");
    return res
      .status(201)
      .json({ status: true, message: "Sub Category data added successfully " });
  } catch {
    return res.status(500).json({ status: false, message: "Server Error" });
  }
};

export var fetchSubCategory = async (req, res, next) => {
  var obj = url.parse(req.url, true).query;

  var subcatList = await subCategorySchemaModel.find(obj);

  var len = subcatList.length;

  if (len != 0) {
    return res.status(201).json({ status: true, subcatList: subcatList });
  } else {
    return res.status(500).json({ status: false, error: "Data Not Found" });
  }
};

export var updateSubCategory = (req, res, next) => {};

export var deleteSubCategory = async (req, res, next) => {
  var id = req.body;
  console.log("id is : " + id);

  var user = await subCategorySchemaModel.find(id);
  console.log("user Data is : " + user);

  if (user.length != 0) {
    let result = await subCategorySchemaModel.deleteOne(id);
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

export var searchSubCategory = async (req, res) => {
  var subcategorySearch = req.params.id;
  console.log("subcategorySearch is : " + subcategorySearch);
  let subCatData = await subCategorySchemaModel.find({
    $or: [{ subcatnm: { $regex: req.params.id } }],
  });
  res.send(subCatData);
};
