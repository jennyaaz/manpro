import express from "express";
const router = express.Router();

import {
  getProyek,
  createProyek,
  updateProyek,
  deleteProyek
} from "../../controllers/proyekController.js";

import { isAuth, checkRole } from "../../middleware/auth.js";

router.get("/", isAuth, checkRole("admin"), getProyek);

router.delete("/:id", isAuth, checkRole("admin"), deleteProyek);

export default router;