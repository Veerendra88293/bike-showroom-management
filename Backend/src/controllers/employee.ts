import { Request, Response } from "express";
import User from "../models/User";

//Add Staff
export const addStaff = async (req: Request, res: Response) => {
  try {
    const { name, username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const staff = await User.create({
      name,
      username,
      password,
      role: "Staff",
      isActive: true,
    });

    return res.status(201).json({
      message: "Staff added successfully",
      staff,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

//Get All Staff
export const getAllStaff = async (_req: Request, res: Response) => {
  try {
    const staffList = await User.find({ role: "Staff" })
    return res.json(staffList);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

//Delete Staff
export const deleteStaff = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await User.findByIdAndDelete(id);

    return res.json({ message: "Staff deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

//Enable / Disable Staff
export const toggleStaffStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Staff not found" });
    }

    user.isActive = !user.isActive;
    await user.save();

    return res.json({
      message: "Staff status updated",
      isActive: user.isActive,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
