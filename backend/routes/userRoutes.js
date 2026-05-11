import express from "express";

import {
  index,
  show,
  store,
  update,
  destroy
} from "../controllers/userController.js";

import {
  authMiddleware
} from "../middleware/authMiddleware.js";

import {
  roleMiddleware
} from "../middleware/roleMiddleware.js";

const router = express.Router();

router.use(
  authMiddleware,
  roleMiddleware("admin")
);

router.get("/", index);

router.get("/:id", show);

router.post("/", store);

router.put("/:id", update);

router.delete("/:id", destroy);

export default router;