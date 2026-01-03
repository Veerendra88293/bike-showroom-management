import { Router } from "express";
import { createSale,getSales } from "../controllers/sales";
import { authorize } from "../middleware/auth-role";
const router = Router();
router.get("/",authorize(["Admin","Staff"]),getSales)
router.post("/", authorize(["Admin","Staff"]), createSale);
export default router;