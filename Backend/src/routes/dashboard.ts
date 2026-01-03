import { Router } from "express";
import { getDashboardStats } from "../controllers/dashboard";
import { authorize } from "../middleware/auth-role";

const router = Router();


router.get("/", authorize(["Admin", "Staff"]), getDashboardStats);

export default router;
