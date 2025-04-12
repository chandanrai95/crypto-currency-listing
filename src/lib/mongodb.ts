import mongoose from "mongoose";

const MONGO_DB_URI = process.env.MONGODB_URI as string;

if (!MONGO_DB_URI) {
    throw new Error('Mongo db uri is not defined!')
}

let cached = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null }
}

export async function connectToDB() {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGO_DB_URI);
    }
    cached.conn = await cached.promise;
    return cached.conn
}