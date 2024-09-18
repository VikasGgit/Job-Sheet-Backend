import dotenv from 'dotenv'
dotenv.config();
import mongoose from "mongoose";

const connectdb=()=>{
mongoose.connect(process.env.MONGODB_URI
)
.then(()=> console.log("DB connection established"))
.catch(err => console.log("Db connection error", err))
};

export default connectdb;