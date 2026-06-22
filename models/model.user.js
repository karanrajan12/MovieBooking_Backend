import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import {USER_TYPE,USER_STATUS} from "../utils/utility.js";
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
        enum:{
            values:[USER_TYPE.customer,USER_TYPE.admin,USER_TYPE.client],
            message:"Invalid User Type"
        },
        default:USER_TYPE.customer
    },
    userStatus:{
        type:String,
        required:true,
        enum:{
            values:[USER_STATUS.approved,USER_STATUS.pending,USER_STATUS.rejected],
            message:"Invalid User Status"
        },
        default:USER_STATUS.approved
    }
    },{timestamps:true});

userSchema.pre('save',async function(){
    const hashedPassword=await bcrypt.hash(this.password,10);
    this.password=hashedPassword;
});

userSchema.methods.isValidPassword=async function(password){
    const compare=await bcrypt.compare(password,this.password);
    return compare;
}

const userModel=mongoose.model('Users',userSchema);

export default userModel;