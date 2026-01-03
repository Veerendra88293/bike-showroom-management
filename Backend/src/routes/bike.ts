import { Router } from "express";
import {
  addBike,
  getBikes,
  updateBike,
  deleteBike,
} from "../controllers/bike";
import { authorize } from "../middleware/auth-role";

const router = Router();

router.get("/", authorize(["Admin", "Staff"]), getBikes);

router.post("/", authorize(["Admin"]), addBike);
router.put("/:id", authorize(["Admin"]), updateBike);
router.delete("/:id", authorize(["Admin"]), deleteBike);

export default router;
