import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import employeeRoutes from "./routes/employee";
import customerRoutes from "./routes/customer";
import bikeRoutes from "./routes/bike";
import salesrouter from "./routes/sales";
import dashboardRoutes from "./routes/dashboard"
import reportRoutes from "./routes/report"
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/bikes", bikeRoutes);
app.use("/api/sales",salesrouter)
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/reports",reportRoutes)

export default app;
