import express from 'express'
const router = express.Router()
import shainkeydetailController from '../controller/shainkeydetailsController';

router.post('/createShainkeydetails', shainkeydetailController.createShainkeydetails);
router.get('/getshainkeydetails',);
router.update('/updateshainkeydetails',);
router.delete('deleteshainkeydetails',);

export default router;
