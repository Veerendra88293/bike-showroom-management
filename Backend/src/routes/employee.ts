import { Router } from "express";
import { addStaff, deleteStaff, getAllStaff, toggleStaffStatus } from "../controllers/employee";
import { authorize } from "../middleware/auth-role";

const router = Router();
router.post("/", authorize(["Admin"]), addStaff);              // Add staff
router.get("/", authorize(["Admin"]), getAllStaff);             // List staff
router.delete("/:id",authorize(["Admin"]), deleteStaff);       // Delete staff
router.patch("/:id/status",authorize(["Admin"]), toggleStaffStatus); // Enable/Disable
export default router;