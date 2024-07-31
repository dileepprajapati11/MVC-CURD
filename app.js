//Import All Dependenices :
import express from "express";
import fileUpload from "express-fileupload";
import session from "express-session";
import bodyParser from "body-parser";
import cors from "cors";

import "./model/connection.js";

//Import All Routers
import userRouter from "./routes/user.router.js";
import categoryRouter from "./routes/category.router.js";
import subCategoryRouter from "./routes/subcategory.router.js";
import productRouter from "./routes/product.router.js";
import reviewRouter from "./routes/review.router.js";

var app = express();

//to extract body data from request(POST, PUT, DELETE, PATCH)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//to allow cors request
app.use(cors());

// to allow file input
app.use(fileUpload());

app.use(session({
  secret: 'abcdef', 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

//route level middleware to load api router

app.use("/user", userRouter);
app.use("/category", categoryRouter);
app.use("/subcategory", subCategoryRouter);
app.use("/product", productRouter);
app.use("/review", reviewRouter);

app.listen(3001);
console.log("Server Invoked at link http://localhost:3001");
