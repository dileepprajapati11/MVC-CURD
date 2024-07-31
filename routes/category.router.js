import express from 'express'
const router = express.Router();

import * as categoryController from '../controller/category.controller.js'

router.post("/saveCategory",categoryController.saveCategory);
router.get("/fetchCategory",categoryController.fetchCategory);
router.patch("/updateCategory",categoryController.updateCategory);
router.delete("/deleteCategory",categoryController.deleteCategory);


export default router;