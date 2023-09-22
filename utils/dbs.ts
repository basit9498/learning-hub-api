import mongoose from "mongoose";

const dbUrl: string = process.env.DATABASE_URL || "";

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl).then((data) => {
      console.log(`DataBase has been connected with ${data.connection.host}`);
    });
  } catch (error: any) {
    console.log(error.message);
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;
