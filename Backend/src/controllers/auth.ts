import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
const JWT_SECRET = "veerendra_n_2003_08";

export const login = async (req: Request, res: Response) => {
  
  const { username, password, role } = req.body;

  const user = await User.findOne({ username, role });
  if (user && !user.isActive) {
      return res.status(403).json({
        message: "Your account is deactivated. Please contact admin.",
      });
    }
  else if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid credentials or role" });
  }
  const token = jwt.sign(
    { id: user._id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
  res.json({
    message: "Login successful",
    token,
    role: user.role,
    username:user.username,
  });
};
