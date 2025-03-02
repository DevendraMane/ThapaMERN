import mongoose, { mongo } from "mongoose";
import "dotenv/config"; // Automatically loads .env variables

// const URI = `mongodb://127.0.0.1:27017/mern_admin`;
const URI = process.env.MONGODB_URI;
// mongoose.connect(URI);

const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log(`Connection Successful to DB ✅`);
  } catch (error) {
    console.error(`DB connection failed 😬...`);
    console.log(error);
    process.exit(1); //?Failure exit [When a critical error occurs (e.g., DB connection failure)]
  }
};

export default connectDB;
