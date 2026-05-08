import express from "express";
const router = express.Router();
import {
  getPekerjaanByProyek,
  createPekerjaan,
  updatePekerjaan,
  deletePekerjaan
} from "../../controllers/pekerjaanController.js";
import { isAuth, checkRole } from "../../middleware/auth.js";

// Endpoint utama: /api/pm/pekerjaan
router.get("/proyek/:proyek_id", isAuth, checkRole("pm"), getPekerjaanByProyek);
router.post("/", isAuth, checkRole("pm"), createPekerjaan);
router.put("/:id", isAuth, checkRole("pm"), updatePekerjaan);
router.delete("/:id", isAuth, checkRole("pm"), deletePekerjaan);

export default router;