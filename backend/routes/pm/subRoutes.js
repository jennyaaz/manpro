import express from "express";
const router = express.Router();

import {
  getSubByPekerjaan,
  getSubByProyek,
  createSub,
  updateSub,
  deleteSub
} from "../../controllers/subPekerjaanController.js";

import { isAuth, checkRole } from "../../middleware/auth.js";

// ambil sub berdasarkan pekerjaan
router.get(
  "/pekerjaan/:pekerjaan_id",
  isAuth,
  checkRole("pm"),
  getSubByPekerjaan
);

router.get(
  "/proyek/:proyek_id", 
  isAuth, 
  checkRole("pm"), 
  getSubByProyek
);

// CRUD
router.post("/", isAuth, checkRole("pm"), createSub);
router.put("/:id", isAuth, checkRole("pm"), updateSub);
router.delete("/:id", isAuth, checkRole("pm"), deleteSub);

export default router;