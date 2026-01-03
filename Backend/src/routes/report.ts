import express from "express";
import { getReportCardStats } from "../controllers/report";
import { authorize } from "../middleware/auth-role";

const router = express.Router();

router.get("/",authorize(["Admin"]), getReportCardStats);

export default router;
