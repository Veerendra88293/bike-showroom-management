import { Request, Response } from "express";
import Bike from "../models/bike";

// Add Bike 
export const addBike = async (req: Request, res: Response) => {
  try {
    const bike = await Bike.create(req.body);
    res.status(201).json(bike);
  } catch {
    res.status(500).json({ message: "Failed to add bike" });
  }
};

//  Get All Bikes
export const getBikes = async (_req: Request, res: Response) => {
  try {
    const bikes = await Bike.find().sort({ createdAt: -1 });
    res.json(bikes);
  } catch {
    res.status(500).json({ message: "Failed to fetch bikes" });
  }
};

//Update Bike
export const updateBike = async (req: Request, res: Response) => {
  try {
    const bike = await Bike.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(bike);
  } catch {
    res.status(500).json({ message: "Failed to update bike" });
  }
};

//Delete Bike
export const deleteBike = async (req: Request, res: Response) => {
  try {
    await Bike.findByIdAndDelete(req.params.id);
    res.json({ message: "Bike deleted" });
  } catch {
    res.status(500).json({ message: "Failed to delete bike" });
  }
};
