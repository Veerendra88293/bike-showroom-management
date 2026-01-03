import mongoose, { Schema, Document } from "mongoose";

export interface IBike extends Document {
  bikemodel: string;
  company: string;
  engine: number;
  color: string;
  price: number;
  stock: number;
}

const BikeSchema = new Schema<IBike>(
  {
    bikemodel: { type: String, required: true },
    company: { type: String, required: true },
    engine: { type: Number, required: true },
    color: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IBike>("Bike", BikeSchema);
