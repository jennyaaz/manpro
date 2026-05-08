import express from "express";
const router = express.Router();

import {
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../../controllers/userController.js";

import { isAuth, checkRole } from "../../middleware/auth.js";

/* ================= ADMIN ONLY ================= */
router.get("/", isAuth, checkRole("admin"), getUser);
router.post("/", isAuth, checkRole("admin"), createUser);
router.put("/:id", isAuth, checkRole("admin"), updateUser);
router.delete("/:id", isAuth, checkRole("admin"), deleteUser);

export default router;