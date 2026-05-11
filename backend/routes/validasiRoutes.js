import express from "express";

import {
  approve,
  reject
} from "../controllers/validasiController.js";

import {
  authMiddleware
} from "../middleware/authMiddleware.js";

import {
  roleMiddleware
} from "../middleware/roleMiddleware.js";

const router = express.Router();

router.use(
  authMiddleware,
  roleMiddleware("direktur")
);

router.put(
  "/approve/:proyekId",
  approve
);

router.put(
  "/reject/:proyekId",
  reject
);

export default router;