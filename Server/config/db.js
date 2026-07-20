import mongoose from "mongoose";

const connectDb = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is missing in .env");
        }

        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 10000,
        });

        console.log("DB is connected");
    } catch (error) {
        console.log(`Errors In DB ${error.message}`);
        process.exit(1);
    }
};

export default connectDb;
