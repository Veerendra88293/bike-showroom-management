import { Router } from "express";
import {
  addCustomer,
  getCustomers,
  deleteCustomer,
} from "../controllers/customer";
import { authorize } from "../middleware/auth-role";

const router = Router();


router.get("/", authorize(["Admin", "Staff"]), getCustomers);
router.post("/", authorize(["Admin", "Staff"]), addCustomer);
router.delete("/:id", authorize(["Admin","Staff"]), deleteCustomer);
export default router;
