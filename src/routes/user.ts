import express, { Request, Response } from 'express';
import User from '../model/user';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/register', async (req: Request| any,res:Response | any) => {
    try {
   
        const { name, email, password } = req?.body;
        const existUSer = await User.findOne({ email });
        if (existUSer) return res.status(400).json({ message: "user already exist" });
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password:hashPassword });
        await newUser.save();
        return res.status(200).json({ message: "user register" })
    } catch (error) {
        return res.status(400).json({ error: `error ,${error}` });
    }
})

router.post('/login',async(req: Request| any,res:Response | any)=>{
    try{
        const {email,password}=req?.body;
        const user:any=await User.findOne({email});
        if(!user) return res.status(400).json({message:"invalid email"});
        const isMatch=await bcrypt.compare(password,user?.password);
        if(!isMatch) return res.status(400).json({message:"invalid credential"});
        const token=jwt.sign({id:user?._id},'super_secret',{expiresIn:'1h'});
        user.token=token;
        await user.save();
        return res.status(200).json({token:token});
    }catch(error){
        return res.status(400).json({error:"server error"})
    }
})

export default router;