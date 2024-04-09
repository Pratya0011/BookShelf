import express from "express";
import { getUserDetails } from "../Controllers/userController.js";

const router = express.Router();

router.get("/get_user_details/:id", getUserDetails);

export default router;
