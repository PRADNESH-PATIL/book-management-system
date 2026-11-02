const mongoose= require("mongoose");

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDb connected");
    }
    catch(error){
        console.error("MongoDB connection Failed", error.message);
        console.exit(1);
    }
};

module.exports = connectDB;