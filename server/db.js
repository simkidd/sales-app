import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to mongodb`)

        return db;
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

export default connectDB;
