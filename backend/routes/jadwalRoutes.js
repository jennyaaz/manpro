import express from "express";

import {
  index,
  store,
  update,
  destroy
} from "../controllers/jadwalController.js";

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

router.post(
  "/",
  roleMiddleware("pm"),
  store
);

router.put(
  "/:id",
  roleMiddleware("pm"),
  update
);

router.delete(
  "/:id",
  roleMiddleware("pm"),
  destroy
);

export default router;