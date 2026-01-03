import { Request, Response } from "express";

import Sales from "../models/sales";
import Bike from "../models/bike";

export const createSale = async (req: Request, res: Response) => {
  try {
    const { customer, bikeId, price, discount, payment, soldBy } = req.body;
    const bikeDoc = await Bike.findById(bikeId);
    if (!bikeDoc) return res.status(404).json({ message: "Bike not found" });
    if (bikeDoc.stock <= 0)
      return res.status(400).json({ message: "Bike out of stock" });
    const totalAmount = price - (discount || 0);
    const invoiceNo = "INV-" + Date.now();
    await Bike.findByIdAndUpdate(bikeId, { $inc: { stock: -1 } });
    const sale = await Sales.create({
      invoiceNo,
      customerName: customer,
      bikeId,
      bikeModel: bikeDoc.bikemodel, //from db
      price,
      discount,
      totalAmount,
      paymentMode: payment,
      soldBy,
      staffId: req.user?.id,
    });
    res.status(201).json(sale);
  } catch (e) {
    res.status(500).json({ message: "Failed to create sale" });
  }
};

export const getSales = async (req: Request, res: Response) => {
  try {
    if (req.user && req.user.role === "Admin") {
      const sales = await Sales.find().sort({ createdAt: -1 });
      res.json(sales);
    } else if (req.user) {
      const sales = await Sales.find({ staffId: req.user.id }).sort({
        createdAt: -1,
      });
      res.json(sales);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (e) {
    res.status(500).json({ message: "Failed to fetch sales" });
  }
};
