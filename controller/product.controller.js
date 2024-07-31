import "../model/connection.js";
import productSchemaModel from "../model/productmodel.js";
import path from "path";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
import randomstring from "randomstring";
import url from "url";

export var saveProduct = async (req, res, next) => {
  var pDetails = req.body;
  console.log("Product Details is : " + JSON.stringify(pDetails));

  var picon = req.files.piconnm;
  console.log("Cat icon : " + picon);
  console.log("--------------------1");

  var pList = await productSchemaModel.find();
  var len = pList.length;
  console.log("Product length is : " + len);
  console.log("--------------------2");

  var _id = len == 0 ? 1 : pList[len - 1]._id + 1;
  console.log("id is :" + _id);
  console.log("--------------------3");

  // var piconnm = Date.now() + "-" + randomstring.generate() + "-" + caticon.name;
  var piconnm = Date.now() + "-" + randomstring.generate() + "-" + picon.name;

  console.log("Prodtch icon name is : " + piconnm);
  console.log("--------------------4");

  // pDetails = { ...pDetails, _id: _id, piconnm: piconnm };
  pDetails = { ...pDetails, "_id": _id, "piconnm": piconnm, "info": Date() };
  console.log("Prodtct details : " + JSON.stringify(pDetails));
  console.log("--------------------5");

  try {
    var prodtuct = await productSchemaModel.create(pDetails);
    console.log("Product is : " + prodtuct);
    console.log("--------------------6");
    var uploadpath = path.join(
      __dirname,
      "../../demo_ui/public/Upload/pro_icon",
      piconnm
    );
    picon.mv(uploadpath);
    console.log("--------------------7");

    res.status(201).json({ status: true, message: "Product Add Successfully" });
  } catch(err) {
    res.status(500).json({ status: false, message: "Product not saved" ,"err": err.message });
  }
};

export var fetchProduct = async (req, res, next) => {
  var obj = url.parse(req.url, true).query;

  var pList = await productSchemaModel.find(obj);

  var len = pList.length;
  if (len != 0) {
    return res.status(201).json({ status: true, pList: pList });
  } else {
    return res.status(500).json({ status: false, error: "Data Not Found" });
  }
};

export var updateProduct = async (req, res, next) => {
  var pDetails = req.body;
  console.log("Product Details is : " + JSON.stringify(pDetails));

  var id = pDetails._id;
  console.log("id is : " + id);

  try {
    var product = await productSchemaModel.findByIdAndUpdate(id, pDetails, {
      new: true,
    });
    console.log("Product is : " + product);

    if (product) {
      return res
        .status(201)
        .json({ status: true, message: "Product Update Successfully" });
    } else {
      return res
        .status(500)
        .json({ status: false, message: "Product not Update" });
    }
  } catch (err) {
    res.status(500).json({ status: false, message: "Product not Update", "err": err.message });
  }
};  

export var deleteProduct = async (req, res, next) => {
  var id = req.body;
  // const { id } = req.params;
  console.log("id is : " + id);

  var user = await productSchemaModel.find(id);
  console.log("user Data is : " + user);

  if (user.length != 0) {
    let result = await productSchemaModel.deleteOne(id);
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
    return res.status(400).json({ message: "Resource not found" });
  }
};
