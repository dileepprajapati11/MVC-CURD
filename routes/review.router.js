import express from 'express'
const router = express.Router();

import * as reviewController from '../controller/review.controller.js'

router.post("/saveReview",reviewController.saveReview);
router.get("/fetchReview",reviewController.fetchReview);
router.patch("/updateReview",reviewController.updateReview);
router.delete("/deleteReview",reviewController.deleteReview);


export default router;