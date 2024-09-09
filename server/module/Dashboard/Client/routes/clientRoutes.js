import express from "express";
const router = express.Router();
import ClientController from "../controller/clientController.js";
import checkUserAuth from "../../../../middlewares/auth-middleware.js";

router.use('/create/client', checkUserAuth)


router.post('/create/client', ClientController.createClient)
// router.post('/login', UserController.userLogin)
// router.get('/changepassword',UserController.changeUserPassword)

export default router;