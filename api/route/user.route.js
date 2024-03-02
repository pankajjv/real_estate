import express from "express";
import { deleteUser, getUserListings, update, getAuthor } from "../controller/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get('/listing/:id',verifyToken, getUserListings)
router.post('/update/:id', verifyToken, update);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/:id',verifyToken, getAuthor)

export default router