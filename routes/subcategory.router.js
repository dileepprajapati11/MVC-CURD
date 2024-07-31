import express from 'express'
const router = express.Router();

import * as subCategoryController from '../controller/subcategory.controller.js'

router.post("/saveSubCategory",subCategoryController.saveSubCategory);
router.get("/fetchSubCategory",subCategoryController.fetchSubCategory);
router.patch("/updateSubCategory",subCategoryController.updateSubCategory);
router.delete("/deleteSubCategory",subCategoryController.deleteSubCategory);
router.get("/searchSubCategory", subCategoryController.searchSubCategory);


export default router;