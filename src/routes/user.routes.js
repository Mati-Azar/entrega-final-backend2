import { Router } from "express";
import {
  getLandingController,
  getUserController,
} from "../controllers/user.controller.js";

const router = Router();

router.get("/", getLandingController);
router.get("/user", getUserController);

export default router;
