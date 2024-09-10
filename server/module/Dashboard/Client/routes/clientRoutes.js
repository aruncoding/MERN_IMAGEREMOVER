import express from "express";
const router = express.Router();
import ClientController from "../controller/clientController.js";
import checkUserAuth from "../../../../middlewares/auth-middleware.js";

router.use('/create/client', checkUserAuth)
router.use('/getclient', checkUserAuth)


router.post('/create/client', ClientController.createClient)
// router.post('/login', UserController.userLogin)
router.get('/getclient',ClientController.getClient)

export default router;