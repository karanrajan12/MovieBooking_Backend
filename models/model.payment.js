import mongoose from 'mongoose';
import {BOOKING_STATUS, PAYMENT_STATUS} from "../utils/utility.js";

const paymentSchema=new mongoose.Schema(
    {
        bookingId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"Bookings"
        },
        amount:{
            type:Number,
            required:true
        },
        status:{
            type:String,
            required:true,
            enum:{
                value:[PAYMENT_STATUS.cancelled,PAYMENT_STATUS.pending,PAYMENT_STATUS.success],
                message:"Invalid Payment    Status"
            },
            default:PAYMENT_STATUS.pending
        }
    },{timestamps:true}
);

const payment=mongoose.model("Payments",paymentSchema);

export default payment;