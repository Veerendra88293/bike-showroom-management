export interface BikeModelSale {
  _id: string;
  value: number;
}
export interface DailySale {
  _id: {
    year: number;
    month: number;
    day: number;
  };
  sales: number;
}
export interface StaffSalesAgg {
  staffName?: string; // optional (one record has no name)
  totalSales: number;
}
export interface RecentSale {
  _id: string;
  invoiceNo: string;
  customerName: string;
  bikeId: string;
  bikeModel: string;
  quantity: number;
  totalAmount: number;
  createdAt: string;
}
export interface MonthlySale {
  _id: number;      // month number (1–12)
  sales: number;
}
export interface AdminDashboardData {
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
  bikesSoldTotal?: number;
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
export interface StaffDashboardData {
  totalBikes: number;
  availableStock: number;
  totalCustomers: number;
  totalSales: number;
  bikesSoldToday: number;
  totalRevenue: number;
  bikesSoldTotal: number;

  bikeModelSales: BikeModelSale[];
  monthlySales: MonthlySale[];
  recentSales: RecentSale[];
}