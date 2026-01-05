import mongoose from "mongoose";

// const MONGO_URI = "mongodb+srv://root:root@cluster0.i1uluuq.mongodb.net/bikeshowroom?retryWrites=true&w=majority&appName=Cluster0";
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined in environment variables");
}
export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed");
    process.exit(1);
  }
};
