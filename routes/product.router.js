import express from 'express'
const router = express.Router();

import * as productController from '../controller/product.controller.js'

router.post("/saveProduct",productController.saveProduct);
router.get("/fetchProduct",productController.fetchProduct);
router.patch("/updateProduct",productController.updateProduct);
router.delete("/deleteProduct",productController.deleteProduct);


export default router;