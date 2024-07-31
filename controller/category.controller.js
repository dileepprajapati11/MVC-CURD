import "../model/connection.js";
import categorySchemaModel from "../model/categorymodel.js";
import path from "path";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
import randomstring from "randomstring";
import url from "url";


export var saveCategory = async (req, res, next) => {
  var catDetails = req.body;
  var caticon = req.files.caticon;

  console.log("Catefory details :" + catDetails + " : " + caticon);

  var catList = await categorySchemaModel.find();
  var len = catList.length;
  console.log("length is :" + len);

  var _id = len == 0 ? 1 : catList[len - 1]._id + 1;
  console.log("id is :" + _id);

  var caticonnm =
    Date.now() + "-" + randomstring.generate() + "-" + caticon.name;
  console.log("category icon name is : " + caticonnm);

  catDetails = { ...catDetails, _id: _id, caticonnm: caticonnm };
  console.log("category details : " + JSON.stringify(catDetails));

  try {
    var cat = await categorySchemaModel.create(catDetails);
    console.log("Cat is : " + cat);
    var uploadpath = path.join(
      __dirname,
      "../../demo_ui/public/Upload/Cat_Icon",
      // "../../../../Group-Project/client_side/public/Upload/Cat_Img",
      caticonnm
    );
    caticon.mv(uploadpath);

    res
      .status(201)
      .json({ status: true, message: "Category Add Successfully" });
  } catch (err) {
    res.status(500).json({ status: false, message: "category not saved" });
  }
};

export var fetchCategory = async (req, res, next) => {
  var cat_obj = url.parse(req.url, true).query;
  var catList = await categorySchemaModel.find(cat_obj);
  var len = catList.length;
  console.log("length is : " + len);

  if (len != 0) {
    return res.status(201).json({ status: true, catList: catList });
  } else {
    return res.status(500).json({ message: "category not found" });
  }
};

export var updateCategory = (req, res, next) => {};

export var deleteCategory = async (req, res, next) => {
  var id = req.body;
  console.log("id is : " + id);

  var user = await categorySchemaModel.find(id);
  console.log("User Data is : " + user);

  if (id != 0) {
    var result = await categorySchemaModel.deleteOne(id);
    console.log("Result is : " + result);

    if (result) {
      return res
        .status(201)
        .json({ status: true, message: "data is delete successfully" });
    } else {
      return res
        .status(500)
        .json({ status: false, message: "Record not Delete" });
    }
  } else {
    return res.satus(400).json({ message: "Resource not found" });
  }
};
