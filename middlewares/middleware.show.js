import {STATUS_CODES} from "../utils/utility.js";
import ERRresbody from "../utils/errorresponseBody.js";
import SUCresbody from "../utils/successresponseBody.js";
import mongoose from "mongoose";
import theatreServices from "../services/service.theatre.js";

const ObjectId=mongoose.Types.ObjectId;

const validateCreateShowRequest=async(req,res,next)=>{
    if(!req.body.theatreId){
        ERRresbody.error="No theatre provided";
        return res.status(STATUS_CODES.BAD_REQUEST).json(ERRresbody);
    }
    if(!ObjectId.isValid(req.body.theatreId)){
        ERRresbody.error="Invalid theatre ID"
        return res.status(STATUS_CODES.BAD_REQUEST).json(ERRresbody);
    }
    if(!req.body.movieId){
        ERRresbody.error="No Movie provided";
        return res.status(STATUS_CODES.BAD_REQUEST).json(ERRresbody);
    }
    if(!ObjectId.isValid(req.body.movieId)) {
        ERRresbody.error = "Invalid movie ID"
        return res.status(STATUS_CODES.BAD_REQUEST).json(ERRresbody);
    }
    if(!req.body.timings){
        ERRresbody.error="No timings provided";
        return res.status(STATUS_CODES.BAD_REQUEST).json(ERRresbody);
    }
    if(!req.body.price){
        ERRresbody.error="No price provided";
        return res.status(STATUS_CODES.BAD_REQUEST).json(ERRresbody);
    }
    if(!req.body.noOfSeats){
        ERRresbody.error="No seats details provided";
        return res.status(STATUS_CODES.BAD_REQUEST).json(ERRresbody);
    }
    const theatre=await theatreServices.getTheatre(req.body.theatreId);
    if(!theatre.movies.includes(req.body.movieId)){
        ERRresbody.error="Given movie is not available in this theatre";
        return res.status(STATUS_CODES.NOT_FOUND).json(ERRresbody);
    }
    next();
}


const validateShowUpdate=async(req,res,next)=>{
    if(req.body.theatreId || req.body.movieId){
        ERRresbody.error="cannot update theatre or movie for an already added show "
        return res.status(STATUS_CODES.BAD_REQUEST).json(ERRresbody);
    }
    next();
}
export default {
    validateCreateShowRequest,
    validateShowUpdate
};