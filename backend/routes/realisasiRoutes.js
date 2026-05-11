import express from "express";

import {
  index,
  progress,
  store,
  update,
  destroy
} from "../controllers/realisasiController.js";

import {
  authMiddleware
} from "../middleware/authMiddleware.js";

import {
  roleMiddleware
} from "../middleware/roleMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get(
  "/:rabId",
  index
);

router.get(
  "/progress/:rabId",
  progress
);

router.post(
  "/",
  roleMiddleware("pelaksana"),
  store
);

router.put(
  "/:id",
  roleMiddleware("pelaksana"),
  update
);

router.delete(
  "/:id",
  roleMiddleware("pelaksana"),
  destroy
);

export default router;