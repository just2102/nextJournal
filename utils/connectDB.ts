import { Schema, model, connect } from 'mongoose';

const connectDB = async () => {
  if (process.env.MONGO_URI) {
    try {
      const conn = await connect(process.env.MONGO_URI)

      console.log(`mongodb connected: ${conn.connection.host}`)
      return conn.connection.host;
  } catch(err) {
      console.log(err)
      process.exit(1)
  }
  }
};

export default connectDB;
