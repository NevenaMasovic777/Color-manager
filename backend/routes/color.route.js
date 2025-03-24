import express from "express";
import {
  addColor,
  deleteColor,
  getColors,
  updateColor,
} from "../controllers/color.controller.js";

const router = express.Router();

router.get("/", getColors);
router.post("/", addColor);
router.put("/:id", updateColor);
router.delete("/:id", deleteColor);

export default router;
