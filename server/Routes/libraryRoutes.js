import express from "express";
import { addToCart } from "../Controllers/libraryController.js";

const router = express.Router();

router.patch("/cart/:id", addToCart);

export default router;
