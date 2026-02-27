import mongoose from 'mongoose'
const DB_NAME = "Tech-Reporter"

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        console.log(`\n MongoDB is connected !! At Host ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("Mongodb connection error ",error)
        process.exit(1)
    }
}

export default connectDB;