import mongoose, { Schema, Document } from "mongoose";

export interface ISale extends Document {
  invoiceNo: string;
  customerName: string;
  bikeId: mongoose.Types.ObjectId;
  bikeModel: string;
  price: number;
  discount: number;
  totalAmount: number;
  paymentMode: string;
  soldBy: string;
  saleDate: Date;
  staffId:mongoose.Types.ObjectId
}

const SaleSchema = new Schema<ISale>(
  {
    invoiceNo: { type: String, required: true },
    customerName: { type: String, required: true },
    bikeId: { type: Schema.Types.ObjectId, ref: "Bike" },
    bikeModel: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    paymentMode: { type: String, required: true },
    soldBy: { type: String, required: true },
    saleDate: { type: Date, default: Date.now },
    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<ISale>("Sale", SaleSchema);
