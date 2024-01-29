import express from "express";
import { home } from "../controller/user.controller.js";
import { test } from "../controller/user.controller.js";
const router  = express.Router();

router.get('/', home)
router.get('/test', test)

export default router;