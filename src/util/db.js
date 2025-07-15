 import mongoose from 'mongoose';

const connection = {};  

async function connectDB() {
  if (connection.isConnected) {
    
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
       
    });
    connection.isConnected = db.connections[0].readyState;
    console.log('New database connection established.'); 
  } catch (error) {
    console.error('Database connection error:', error);
    
    throw new Error('Failed to connect to database');
  }
}

export default connectDB;
