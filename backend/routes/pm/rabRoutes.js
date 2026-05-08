import express from "express";
const router = express.Router();

import {
  getRabByProyek,
  createRab,
  updateRab,
  deleteRab
} from "../../controllers/rabController.js";

import { checkRole } from "../../middleware/auth.js";

router.get("/proyek/:proyek_id", getRabByProyek);
router.post("/", checkRole(["pm"]), createRab);
router.put("/:id", checkRole(["pm"]), updateRab);
router.delete("/:id", checkRole(["pm"]), deleteRab);

export default router;