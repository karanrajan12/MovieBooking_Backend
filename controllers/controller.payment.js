import paymentServices from "../services/service.payment.js"
import {BOOKING_STATUS, STATUS_CODES} from "../utils/utility.js";
import ERRresbody from "../utils/errorresponseBody.js";
import SUCresbody from "../utils/successresponseBody.js";

const create=async(req,res)=>{
    try{
        const response=await paymentServices.createPayment(req.body);
        if(response.status==BOOKING_STATUS.expired){
            ERRresbody.error="The Payment took more than 5 minutes to get processed,so your booking got expired, try again";
            ERRresbody.data=response;
            return res.status(STATUS_CODES.GONE).json(ERRresbody);
        }
        if(response.status == BOOKING_STATUS.cancelled) {
            ERRresbody.error = 'The payment failed due to some reason';
            ERRresbody.data = response;
            return res.status(STATUS.PAYMENT_REQUIRED).json(errorResponseBody);
        }
        SUCresbody.data=response;
        SUCresbody.message="Booking completed successfully";
        return res.status(STATUS_CODES.OK).json(SUCresbody);
    }catch(error){
        if(error.err){
            ERRresbody.error=error.err;
            return res.status(error.code).json(ERRresbody);
        }
        ERRresbody.error=error;
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(ERRresbody);
    }
}

const getPaymentDetails=async(req,res)=>{
    try{
        const response= await paymentServices.getPaymentById(req.params.id);
        SUCresbody.data=response;
        SUCresbody.message="Succesfully fetched the Payment Details";
        return res.status(STATUS_CODES.OK).json(SUCresbody);
    }catch(error){
        console.log(error);
        if(error.err){
            ERRresbody.err = error.err;
            return res.status(error.code).json(ERRresbody);
        }
        ERRresbody.err = error;
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(ERRresbody);
    }
}



export default {
    create,
    getPaymentDetails
};