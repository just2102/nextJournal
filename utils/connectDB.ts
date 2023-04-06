import { connect } from "mongoose";

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  throw new Error(
    "Please define the MONGO_URI environment variable inside .env"
  );
}

const connectDB = async () => {
  console.log("MONGO_URI", MONGO_URI)
  if (process.env.MONGO_URI) {
    try {
      const conn = await connect(MONGO_URI, {
      });

      console.log(`mongodb connected: ${conn.connection.host}`);
      return conn.connection.host;
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
  }
};

export default connectDB;
