import express from "express";
const router = express.Router();
import UserController from "../controller/userController.js";
import checkUserAuth from "../../../middlewares/auth-middleware.js";
// import upload from "../../../middlewares/upload-middleware.js";
// import checkUserAuth from "../../../middlewares/auth-middleware.js";

router.use('/changepassword', checkUserAuth)

router.post('/register', UserController.userRegistration)
router.post('/login', UserController.userLogin)
router.get('/changepassword',UserController.changeUserPassword)

export default router;