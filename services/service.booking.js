import bookingModel from "../models/model.booking.js";
import {STATUS_CODES} from "../utils/utility.js";

const createBooking=async(body)=>{
    try{
        const response=await bookingModel.create(body);
        return response;
    }catch(err){
        if(err.name==="ValidationError"){
            let err={};
            Object.keys(error.errors).forEach(key=>{
                err[key]=error.errors[key].message();
            });
            throw {error:err,code:STATUS_CODES.UNPROCESSABLE_ENTITY};
        }
        throw err;
    }
}

const updateBooking=async(data,bookingId)=>{
    try{
        const response = await bookingModel.findByIdAndUpdate(
            bookingId,
            data,
            {
                new: true,
                runValidators: true
            }
        );
        if(!response){
            throw{
                err:"No Booking Found for the given Id",
                "code":STATUS_CODES.NOT_FOUND
            }
        }
        return response;
    }catch (err) {
        if (err.name === "ValidationError") {
            let errors = {};

            Object.keys(err.errors).forEach(key => {
                errors[key] = err.errors[key].message;
            });

            throw {
                error: errors,
                code: STATUS_CODES.UNPROCESSABLE_ENTITY
            };
        }

        console.log(err);
        throw err;
    }
}

export default {createBooking,
    updateBooking
}