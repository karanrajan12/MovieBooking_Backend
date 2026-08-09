import paymentModel from "../models/model.payment.js";
import bookingModel from "../models/model.booking.js";
import showModel from "../models/model.show.js";
import userModel from "../models/model.user.js";
import {STATUS_CODES,BOOKING_STATUS,PAYMENT_STATUS,USER_TYPE} from "../utils/utility.js";

const createPayment=async(data)=>{
    try{
        const booking=await bookingModel.findById(data.bookingId);
        const show=await showModel.findOne(
            {
                movieId:booking.movieId,
                theatreId:booking.theatreId,
                timing:booking.timing
            }
        );
        if(booking.status===BOOKING_STATUS.successfull){
            throw{
                err:"Booking is already done,already payment done",
                code:STATUS_CODES.FORBIDDEN
            }
        }
        if(!booking){
            throw{
                err:"No booking found",
                code:STATUS_CODES.NOT_FOUND
            }
        }
        let bookingTime=booking.createdAt;
        let currentTime=Date.now();
        let minutes=Math.floor(((currentTime-bookingTime)/1000)/60);
        if(minutes>5){
            booking.status=BOOKING_STATUS.expired;
            await booking.save();
            return booking;
        }
        const payment=await paymentModel.create({
            bookingId:data.bookingId,
            amount:data.amount
        });
        if(paymentModel.amount != booking.totalCost){
            paymentModel.status=PAYMENT_STATUS.success;
        }
        if(!payment || paymentModel.status==PAYMENT_STATUS.failed){
            booking.status=PAYMENT_STATUS.cancelled;
            await booking.save();
            await payment.save();
            return booking;
        }
        paymentModel.status=PAYMENT_STATUS.success;
        booking.status=BOOKING_STATUS.successfull;
        show.noOfSeats -=booking.noOfSeats;
        await showModel.save();
        await booking.save();
        await paymentModel.save();
        return booking;
    }catch(error){
        console.log(error);
        throw error;
    }
}


const getPaymentById=(bookingId)=>{
    try{
        const details=bookingModel.findById(bookingId);
        if(!details){
            throw{
                err:"No payment record found for the given Id",
                code:STATUS_CODES.NOT_FOUND
            }
        }
        return details;
    }catch(error){
        return error;
    }
}
export default {
    createPayment,
    getPaymentById
};