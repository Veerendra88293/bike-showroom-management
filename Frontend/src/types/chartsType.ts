import type { BikeModelSale, StaffSalesAgg } from "./cardType";

export interface DailySale {
  _id: {
    day: number;
    month?: number;
    year?: number;
  };
  sales: number;
}
export interface RecentSale {
  _id: string;          // MongoDB ObjectId as string
  invoiceNo: string;
  customerName: string;
  bikeId: string;
  bikeModel: string;
  quantity: number;
  totalAmount: number;
  createdAt: string;
}
export interface MonthlySale {
  _id: number;   // month number (1–12)
  sales: number;
}
export interface AdminChartsData {
  totalBikes: number;
  availableStock: number;
  totalCustomers: number;
  totalSales: number;
  bikesSoldToday: number;
  totalRevenue: number;
  lowStock: number;

  bikeModelSales: BikeModelSale[];
  dailySales: DailySale[];
  recentSales: RecentSale[];
}
export interface StaffChartsData {
  totalBikes: number;
  availableStock: number;
  totalCustomers: number;
  totalSales: number;
  bikesSoldToday: number;
  totalRevenue: number;

  bikeModelSales: BikeModelSale[];
  monthlySales: MonthlySale[];
  recentSales: RecentSale[];
}
export interface ReportDashboardData {
  totalBikes: number;
  availableStock: number;
  totalCustomers: number;
  totalStaff: number;
  totalRevenue: number;
  bikesSoldTotal: number;

  allSales: RecentSale[];
  staffSalesAgg: StaffSalesAgg[];
}
export interface DaySales {
  day: number;
  sales: number;
}
export interface PieLabelProps {
  cx?: number;
  cy?: number;
  midAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
  percent?: number;
}