import express from "express";
import { addToCart, getCartDetails } from "../Controllers/libraryController.js";

const router = express.Router();

router.patch("/cart/:id", addToCart);
router.get("/cart", getCartDetails);

export default router;
