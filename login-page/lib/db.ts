import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

const connectDB = async () => {
    try {
        if (mongoose.connections[0].readyState) return;
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
         throw new Error('Failed to connect to MongoDB');
  }
};

export default connectDB;
