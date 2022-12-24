import mongoose from "mongoose";

const connectDB = async () => {

    const MONGODB_URI= 'mongodb+srv://monkW2:monkeiW2!@cluster0.3sjghn9.mongodb.net/?retryWrites=true&w=majority';

    if (mongoose.connections[0].readyState) {
        console.log("Already connected");
        return;
    }
    
    mongoose.connect(MONGODB_URI, {}, (err) =>{
        if (err) throw err;
        console.log("Connected to mongodb.");
    });

};

export default connectDB;