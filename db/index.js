import mongoose from 'mongoose';

const connectDB = handler => async (req, res) => {
  if (mongoose.connections[0].readyState) {
    // Use current db connection
    return handler(req, res);
  }
  // Use new db connection
 const conn = await mongoose.connect(process.env.MONGO_URI);
console.log(`You Are Connected With MongoDB this Url : ${conn.connection.host}`);
  return handler(req, res);
};

export default connectDB;