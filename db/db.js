import mongoose from "mongoose";

const connectTotDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("\n MongoDb connected !!")
    } catch (error) {
        console.log(error)
    }
} 

export default connectTotDatabase