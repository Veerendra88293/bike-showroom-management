import { Request, Response } from "express";
import mongoose from "mongoose";
import Bike from "../models/bike";
import Customer from "../models/Customer";
import Sale from "../models/sales";

export const getDashboardStats = async (req: any, res: Response) => {
  try {
    const userId = req.user?.id;
    const role = req.user?.role;
    const startOfMonth = new Date();
startOfMonth.setDate(1); // first day of month
startOfMonth.setHours(0, 0, 0, 0)

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    //common admin+staff

    const totalBikes = await Bike.countDocuments();

    const stockAgg = await Bike.aggregate([
      { $group: { _id: null, availableStock: { $sum: "$stock" } } },
    ]);
    const availableStock = stockAgg[0]?.availableStock || 0;
    let response: any = {
      totalBikes,
      availableStock,
    };

  
    if (role === "Admin") {
      response.totalCustomers = await Customer.countDocuments();
      response.totalSales = await Sale.countDocuments();
      response.bikesSoldToday = await Sale.countDocuments({
        saleDate: { $gte: today },
      });

      // Total Revenue
      const revenueAgg = await Sale.aggregate([
        { $group: { _id: null, totalRevenue: { $sum: "$totalAmount" } } },
      ]);
      response.totalRevenue = revenueAgg[0]?.totalRevenue || 0;

      response.lowStock = await Bike.countDocuments({ stock: { $lte: 3 } });

      // Monthly Sales for Line Chart
      response.dailySales = await Sale.aggregate([
  {
    $match: {
      saleDate: { $gte: startOfMonth },
      ...(role === "Staff" && { staffId: userId }), // filter for staff
    },
  },
  {
    $group: {
      _id: { day: { $dayOfMonth: "$saleDate" } },
      sales: { $sum: 1 },
    },
  },
  { $sort: { "_id.day": 1 } },
]);

      // Top Bike Models Pie Chart
      response.bikeModelSales = await Sale.aggregate([
        {
          $group: {
            _id: "$bikeModel",
            value: { $sum: 1 },
          },
        },
        { $sort: { value: -1 } },
        { $limit: 5 },
      ]);

      response.recentSales = await Sale.find()
        .sort({ createdAt: -1 })
        .limit(5);
    }


    if (role === "Staff") {
      const objectUserId = new mongoose.Types.ObjectId(userId);

      response.totalCustomers = await Customer.countDocuments({
        staffId: objectUserId,
      });

      response.totalSales = await Sale.countDocuments({
        staffId: objectUserId,
      });

      response.bikesSoldToday = await Sale.countDocuments({
        staffId: objectUserId,
        saleDate: { $gte: today },
      });

      // Total Revenue by Staff
      const revenueAgg = await Sale.aggregate([
        { $match: { staffId: objectUserId } },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: { $toDouble: "$totalAmount" } }, // convert to number
          },
        },
      ]);
      response.totalRevenue = revenueAgg[0]?.totalRevenue || 0;

      // Monthly Sales by Staff (Line Chart)
      response.monthlySales = await Sale.aggregate([
        { $match: { staffId: objectUserId } },
        {
          $group: {
            _id: { $month: "$saleDate" },
            sales: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]);

      // Top Bike Models Sold by Staff (Pie Chart)
      response.bikeModelSales = await Sale.aggregate([
        { $match: { staffId: objectUserId } },
        {
          $group: {
            _id: "$bikeModel",
            value: { $sum: 1 },
          },
        },
        { $sort: { value: -1 } },
        { $limit: 5 }, // keep same structure as Admin
      ]);

      response.recentSales = await Sale.find({ staffId: objectUserId })
        .sort({ createdAt: -1 })
        .limit(5);
    }

    res.json(response);
  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({ message: "Failed to load dashboard data" });
  }
};
