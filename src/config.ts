import mongoose from "mongoose";

const connectDb=()=>{
    try{
        const url='mongodb://localhost:27017/task';
        mongoose.connect(url).then((res)=>{
            console.log("Database connected")
        }).catch((err)=>{
            console.log("databse not connected",err)
        })
    }catch(error){
        console.log(error);
    }
}

export default connectDb;