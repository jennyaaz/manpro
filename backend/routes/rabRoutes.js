import express from "express";

import {
  index,
  show,
  store,
  update,
  destroy
} from "../controllers/rabController.js";

import {
  authMiddleware
} from "../middleware/authMiddleware.js";

import {
  roleMiddleware
} from "../middleware/roleMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get(
  "/sub/:subId",
  index
);

router.get(
  "/:id",
  show
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