import express from "express";
const router = express.Router();

import {
  getKlien,
  createKlien,
  updateKlien,
  deleteKlien
} from "../../controllers/klienController.js";

import { isAuth, checkRole } from "../../middleware/auth.js";

router.get("/", isAuth, checkRole("admin"), getKlien);
router.post("/", isAuth, checkRole("admin"), createKlien);
router.put("/:id", isAuth, checkRole("admin"), updateKlien);
router.delete("/:id", isAuth, checkRole("admin"), deleteKlien);

export default router;