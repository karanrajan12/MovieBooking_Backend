import mongoose from "mongoose";
import {BOOKING_STATUS} from "../utils/utility.js";

const bookingSchema=new mongoose.Schema(
    {
        theatreId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"Theatre"
        },
        movieId:{
            type:mongoose.Schema.Types.ObjectId,
            required: true,
            ref:"Movies"
        },
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"Users"
        },
        timing:{
            type:String,
            required:true
        },
        noOfSeats:{
            type:Number,
            required:true
        },
        totalCost:{
            type:Number,
        },
        status:{
            type:String,
            required:true,
            enum:{
                values:[BOOKING_STATUS.cancelled,BOOKING_STATUS.inProcess,BOOKING_STATUS.successfull],
                message:"Invalid Booking Status"
            },
            default:BOOKING_STATUS.inProcess
        }
    },
    {timestamps:true}
);

const booking=new mongoose.model('Bookings',bookingSchema);

export default booking;