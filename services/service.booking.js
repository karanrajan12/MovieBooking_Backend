import bookingModel from "../models/model.booking.js";
import {STATUS_CODES} from "../utils/utility.js";

const createBooking=async(body)=>{
    try{
        const response=await bookingModel.create(body);
        return response;
    }catch(err){
        if(err.name==="ValidationName"){
            let err={};
            Object.keys(error.errors).forEach(key=>{
                err[key]=error.errors[key].message();
            });
            throw {error:err,code:STATUS_CODES.UNPROCESSABLE_ENTITY};
        }
        throw err;
    }
}

export default {createBooking

}