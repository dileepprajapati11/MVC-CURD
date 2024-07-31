import express from 'express'
const router = express.Router();

import * as userController from '../controller/user.controller.js'

router.post("/saveUser",userController.saveUser);
router.post("/loginUser",userController.loginUser);
router.get("/fetchUser",userController.fetchUser);
router.patch("/updateUser",userController.updateUser);
router.delete("/deleteUser",userController.deleteUser);
router.get("/tokenUse",userController.otherRouteUser);


export default router;