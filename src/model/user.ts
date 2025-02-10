import mongoose ,{Document,Schema} from "mongoose";

interface User extends Document {
    name:string,
    email:string,
    password:string,
    token:string |null
}

const userSchema=new Schema<User>({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    token:{
        type:String,
        default:null
    }
})

const User=mongoose.model<User>("user",userSchema);
export default User;