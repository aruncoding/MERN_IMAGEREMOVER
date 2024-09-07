import express from "express";
const router = express.Router();
import UserController from "../controller/userController.js";
// import upload from "../../../middlewares/upload-middleware.js";
// import checkUserAuth from "../../../middlewares/auth-middleware.js";

router.post('/register', UserController.userRegistration)
router.post('/login', UserController.userLogin)
router.get('/changepassword',UserController.changeUserPassword)

export default router;