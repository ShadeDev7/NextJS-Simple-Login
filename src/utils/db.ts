import mongoose from "mongoose";

let isConnected = false;

export async function connect(): Promise<void> {
    if (isConnected) return;

    const mongodb = await mongoose.connect(process.env.MONGODB_URL!);

    isConnected = Boolean(mongodb.connection.readyState);
}

const db = { connect };

export default db;
