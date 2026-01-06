export interface Sale {
  _id: string;
  invoiceNo: string;
  customerName: string;
  bikeId: string;
  bikeModel: string;
  price: number;
  discount: number;
  totalAmount: number;
  paymentMode: "Online" | "Showroom";
  soldBy: "Admin" | "Staff";
  staffId: string;
  saleDate: string;
  createdAt: string;
  updatedAt?: string;
}

// Bike used in dropdown
export interface Bike {
  _id: string;
  bikemodel: string;
  price: number;
  stock: number;
}

//Payload when creating a sale
export interface CreateSalePayload {
  customer: string;
  bikeId: string;
  price: number;
  discount: number;
  payment: "Online" | "Showroom";
  soldBy: "Admin" | "Staff";
}