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
                values:[PAYMENT_STATUS.cancelled,PAYMENT_STATUS.pending,PAYMENT_STATUS.success,PAYMENT_STATUS.failed],
                message:"Invalid Payment Status"
            },
            default:PAYMENT_STATUS.pending
        }
    },{timestamps:true}
);

const paymentModel=mongoose.model("Payments",paymentSchema);

export default paymentModel;