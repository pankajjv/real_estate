import  express  from "express";
import { create, deleteListing, getListing, updateListing, getListings } from "../controller/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();

router.post('/create',verifyToken, create);
router.delete('/delete/:id',verifyToken, deleteListing);
router.post('/update/:id', verifyToken, updateListing)
router.get('/get/:id', getListing)
router.get('/get', getListings)





export default router;