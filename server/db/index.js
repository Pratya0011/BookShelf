import mongoose from "mongoose";
import { config } from "dotenv";


config()
const connection = mongoose.connect(process.env.MONGO,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

export default connection
