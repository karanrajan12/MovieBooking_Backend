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

const getBookings=async(data)=>{
    try{
        const response=await bookingModel.find(data);
        return response;
    }catch(err){
        throw err;
    }
}

const getBoookingById = async (id, userId) => {
    try {
        const response = await bookingModel.findById(id);

        if (!response) {
            throw {
                err: "No booking records found for the id",
                code: STATUS_CODES.NOT_FOUND
            };
        }

        if (response.userId != userId) {
            throw {
                err: "Not able to access the booking",
                code: STATUS_CODES.UNAUTHORISED
            };
        }

        return response;

    } catch (error) {
        console.log(error);
        throw error;
    }
};

const getAllBookings=async()=>{
    try{
        const response=await bookingModel.find();
        console.log("Hello");
        return response
    }catch(err){
        throw err;
    }
}

export default {createBooking,
    updateBooking,
    getAllBookings,
    getBookings,
    getBoookingById
}