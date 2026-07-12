import SUCresbody from "../utils/successresponseBody.js";
import ERRresbody from "../utils/errorresponseBody.js";
import bookingServices from "../services/service.booking.js";
import {STATUS_CODES} from "../utils/utility.js";

const create = async (req, res) => {
    try {
        let userId = req.user;
        const response = await bookingServices.createBooking({ ...req.body, userId: userId });
        SUCresbody.message = "Successfully created an Booking";
        SUCresbody.data = response;
        return res.status(STATUS_CODES.OK).json(SUCresbody);
    } catch (err) {
        if (err.error) {
            ERRresbody.error = err.error;
            return res.status(err.code).json(ERRresbody);   // ✅ fixed
        }
        ERRresbody.error = err;
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(ERRresbody);
    }
};



const update=async(req,res)=>{
    try{
        const response=await bookingServices.updateBooking(req.body,req.params.id);
        console.log(response);
        SUCresbody.data=response;
        SUCresbody.message="Successfully Updated the Booking";
        return res.status(STATUS_CODES.OK).json(SUCresbody);
    }catch(error){
        if(error.err){
            ERRresbody.error=err;
            return res.status(error.err.code).json(ERRresbody);
        }
        ERRresbody.error=error;
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(ERRresbody);
    }
}
const getBookings=async(req,res)=>{
    try{
        const response=await bookingServices.getBookings({userId:req.user});
        SUCresbody.data=response;
        SUCresbody.message="Succesfully fetched the Bookings";
        return res.status(STATUS_CODES.OK).json(SUCresbody);
    }catch(err){
        ERRresbody.error=err;
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(ERRresbody);
    }
}

const getAllBookings=async(req,res)=>{
    try{
        const response=await bookingServices.getAllBookings();
        SUCresbody.data=response;
        SUCresbody.message="Succesfully fetched All of the Bookings";
        return res.status(STATUS_CODES.OK).json(SUCresbody);
    }catch(err){
        ERRresbody.error=err;
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(ERRresbody);
    }
}

const getBookingById = async (req, res) => {
    try {
        const response = await bookingServices.getBoookingById(
            req.params.id,
            req.user
        );

        SUCresbody.data = response;
        SUCresbody.message = "Successfully fetched the Booking";

        return res.status(STATUS_CODES.OK).json(SUCresbody);

    } catch (error) {

        if (error.err) {
            ERRresbody.error = error.err;
            return res.status(error.code).json(ERRresbody);
        }

        ERRresbody.error = error;
        return res
            .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
            .json(ERRresbody);
    }
};
export default {create,
    update,
    getAllBookings,
    getBookings,
    getBookingById
}