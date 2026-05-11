import express from "express";

import {
  index,
  show,
  store,
  update,
  destroy
} from "../controllers/proyekController.js";

import {
  authMiddleware
} from "../middleware/authMiddleware.js";

import {
  roleMiddleware
} from "../middleware/roleMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", index);

router.get("/:id", show);

router.post(
  "/",
  roleMiddleware("admin"),
  store
);

router.put(
  "/:id",
  roleMiddleware("admin"),
  update
);

router.delete(
  "/:id",
  roleMiddleware("admin"),
  destroy
);

export default router;