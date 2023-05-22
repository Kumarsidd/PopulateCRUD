import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`mongo connected ${connect.connection.host}`);
  } catch (error) {
    console.log(`Error message - ${error}`);
    process.exit(1);
  }
};

export default connectDB;
