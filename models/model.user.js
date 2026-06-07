import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema=new mongoose.Schema({
    userName:{
        required:true,
        type:String,
        unique:true,
        trim:true
    },
    email:{
        required:true,
        type:String,
        unique:true,
        match:[/^[^\s@]+@[^\s@]+\.[^\s@]+$/,"Please fill an valid email"],
        lowerCase:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    userType:{
        type:String,
        required:true,
        default:"CUSTOMER"
    },
    userStatus:{
        type:String,
        required:true,
        default:"APPROVED"
    }
    },{timestamps:true});

userSchema.pre('save',async function(){
    const hashedPassword=await bcrypt.hash(this.password,10);
    this.password=hashedPassword;
});

const userModel=mongoose.model('Users',userSchema);

export default userModel;