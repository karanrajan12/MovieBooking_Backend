import mongoose from 'mongoose';

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

const userModel=mongoose.model('Users',userSchema);

export default userModel;