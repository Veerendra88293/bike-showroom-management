import mongoose from "mongoose";

const MONGO_URI = "mongodb+srv://root:root@cluster0.i1uluuq.mongodb.net/bikeshowroom?retryWrites=true&w=majority&appName=Cluster0";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed");
    process.exit(1);
  }
};
