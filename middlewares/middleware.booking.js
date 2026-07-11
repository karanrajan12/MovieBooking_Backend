import {STATUS_CODES} from "../utils/utility.js";
import ERRresbody from "../utils/errorresponseBody.js";
import mongoose from 'mongoose';
import theatreServices from "../services/service.theatre.js"
const ObjectId=mongoose.Types.ObjectId;
const checkBookingCreateReq=async(req,res,next)=>{
    if(!req.body.theatreId){
        ERRresbody.error="Theatre ID is not provided"
        return res.status(STATUS_CODES.BAD_REQUEST).json(ERRresbody);
    }
    if(!ObjectId.isValid(req.body.theatreId)){
        ERRresbody.error="No such theatre Id format";
        return res.status(STATUS_CODES.BAD_REQUEST).json(ERRresbody);
    }

    const theatre=await theatreServices.getTheatre(req.body.theatreId);
    if(!theatre){
        ERRresbody.error="No such theatre exits";
        return res.status(STATUS_CODES.NOT_FOUNDT).json(ERRresbody);
    }
    if(!req.body.movieId){
        ERRresbody.error="Movie ID is not provided"
        return res.status(STATUS_CODES.BAD_REQUEST).json(ERRresbody);
    }
    if(!ObjectId.isValid(req.body.movieId)){
        ERRresbody.error="No such Movie Id format";
        return res.status(STATUS_CODES.BAD_REQUEST).json(ERRresbody);
    }
    if(!theatre.movies.includes(req.body.movieId)){
        ERRresbody.error="Given movie is not available in this theatre";
        return res.status(STATUS_CODES.NOT_FOUND).json(ERRresbody);
    }
    if(!req.body.timing){
        ERRresbody.error="timing is not provided"
        return res.status(STATUS_CODES.BAD_REQUEST).json(ERRresbody);
    }
    if(!req.body.noOfSeats){
        ERRresbody.error="No of seats is not provided"
        return res.status(STATUS_CODES.BAD_REQUEST).json(ERRresbody);
    }
    next();
}

export default {checkBookingCreateReq};