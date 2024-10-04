import express from "express";
const router = express.Router();
import imageController from "../controller/imageController.js";
import checkUserAuth from "../../../middlewares/auth-middleware.js";
import { uploadMultiple } from "../../../middlewares/uploadMiddleware.js";

router.use('/uploadimage', checkUserAuth)
router.use('/getimages', checkUserAuth)
// router.use('/login', checkUserAuth)

router.post('/uploadimage', uploadMultiple,imageController.uploadImages)
router.get('/getimages/:folderId/:subFolderId',imageController.getImages)

export default router;