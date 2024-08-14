import { MongoClient } from 'mongodb';
import mongoose from 'mongoose'
let isconected = false;

export const connectDB = async () => {
    
    mongoose.set('strictQuery',true);
    if (!process.env.mongoose_url) return console.log("mongoose url is not found");
    if (isconected) console.log("Already conected to MongoDb");
    try {
       await mongoose.connect(process.env.mongoose_url)
       console.log("Connected to MongoDb");
       isconected = true;
    } catch (error) {
        console.log(error)
    }
}

export async function connectToDatabase() {
    const url = process.env.mongoose_url!;
    if (!url) return console.log("mongoose url is not found");
    const client = new MongoClient(url);
    try {
    if (!client.connect()) await client.connect();
    return client.db('test'); // استبدل باسم قاعدة البيانات
  } catch (error:any) {
    console.error('Failed to connect to the database:', error.message);
    throw error;
  }
}

export async function closeConnection() {
    const url = process.env.mongoose_url!;
    if (!url) return console.log("mongoose url is not found");
    const client = new MongoClient(url);
  try {
    await client.close();
  } catch (error:any) {
    console.error('Failed to close the database connection:', error.message);
  }
}

