import { Request, Response } from "express";
import Bike from "../models/bike";
import Sale from "../models/sales";
import Customer from "../models/Customer";
import User from "../models/User";

export const getReportCardStats = async (req: Request, res: Response) => {
  try {
    const [
      availableStockAgg,
      totalRevenueAgg,
      bikesSoldTotal,
      totalCustomers,
      totalStaff,
      totalBikes,
      allSales,
    ] = await Promise.all([
      // 1. Available stock
      Bike.aggregate([
        {
          $group: {
            _id: null,
            totalStock: { $sum: "$stock" },
          },
        },
      ]) as Promise<{ totalStock: number }[]>,

      // 2. Total revenue
      Sale.aggregate([
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: "$totalAmount" },
          },
        },
      ]) as Promise<{ totalRevenue: number }[]>,

      // 3. Total bikes sold
      Sale.countDocuments(),

      // 4. Total customers
      Customer.countDocuments(),

      // 5. Total staff
      User.countDocuments({ role: "Staff", isActive: true }),

      // 6. Total bike models
      Bike.countDocuments(),
      //    ALL sales (for report table)
      Sale.find().sort({ saleDate: -1 }).populate("staffId", "name").lean(),
    ]);
    // Staff Sales Aggregation for Bar Chart
    const staffSalesAgg = await Sale.aggregate([
      {
        $group: {
          _id: "$staffId", // group by staff
          totalSales: { $sum: 1 }, // count sales
        },
      },
      {
        $lookup: {
          from: "users", // join with users collection
          localField: "_id", // staffId from Sale
          foreignField: "_id", // _id in User
          as: "staff",
        },
      },
      { $unwind: "$staff" }, // flatten array
      {
        $project: {
          _id: 0,
          staffName: "$staff.name",
          totalSales: 1,
        },
      },
    ]);

    res.status(200).json({
      availableStock:
        availableStockAgg.length > 0 ? availableStockAgg[0].totalStock : 0,
      bikesSoldTotal,
      totalCustomers,
      totalStaff,
      totalRevenue:
        totalRevenueAgg.length > 0 ? totalRevenueAgg[0].totalRevenue : 0,
      totalBikes,
      staffSalesAgg,
      allSales,
    });
  } catch (error: unknown) {
    console.error("Report Cards Error:", error);
    res.status(500).json({
      message: "Failed to fetch report card data",
    });
  }
};
