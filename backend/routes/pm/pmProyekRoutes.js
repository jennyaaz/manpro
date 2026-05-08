import express from "express";
import {
  getProyekPM,
  getProyekById
} from "../../controllers/proyekController.js";

import { isAuth, checkRole } from "../../middleware/auth.js";

const router = express.Router();

router.get("/", isAuth, checkRole("pm"), getProyekPM);
router.get("/:id", isAuth, checkRole("pm"), getProyekById);

export default router;