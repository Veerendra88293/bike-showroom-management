export interface RecentSale {
  _id: string;
  invoiceNo: string;
  customerName: string;
  bikeModel: string;
  totalAmount: number;
  paymentMode: "Online" | "Cash"; // adjust if you have more modes
  saleDate: string; // ISO string from backend
}
export type Props = {
  sales: RecentSale[];
  role: "Admin" | "Staff";
  showAll?: boolean;
};