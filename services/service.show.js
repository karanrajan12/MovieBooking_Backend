import showModel from "../models/model.show.js";
import {STATUS_CODES} from "../utils/utility.js";
import theatreModel from "../models/model.theatre.js";
const createShow=async(data)=>{
    try{
        const theatre=await theatreModel.findById(data.theatreId);
        if(!theatre) {
            throw{
                err: "No theatre found",
                code: STATUS_CODES.NOT_FOUND
            }
            const response = await showModel.create(data);
            return response;
        }
    }catch(error){
        if(error.name==="ValidationError"){
            let err={};
            Object.keys(error.errors).forEach(key=>{
                err[key]=error.errors[key].message;
            });
            throw{
                err,
                code:STATUS_CODES.UNPROCESSABLE_ENTITY
            }
        }
        throw error;
    }
}

const getShow=async(data)=>{
    try{
        let filter={};
        if(data.theatreId){
            filter.theatreId=data.theatreId;
        }
        if(data.movieId){
            filter.movieId=data.movieId;
        }
        const response=await showModel.find(filter);
        if(!response){
            throw{
                err:"No shows found",
                code:STATUS_CODES.NOT_FOUND
            }
        }
        return response;
    }catch(error){
        console.log(error)
        throw error;
    }
}

const deleteShow=async(id)=>{
    try{
        const response=await showModel.findByIdAndDelete(id);
        if(!response){
            throw{
                err:"No show found",
                code:STATUS_CODES.NOT_FOUND
            }
        }
    }catch(error){
        throw error;
    }
}

const updateShow=async(id,data)=>{
    try{
        const response=await showModel.findByIdAndUpdate(id,data,{
            new:true,
            runValidators:true
        });
        if(!response){
            throw{
                err:"No show found for the given ID",
                code:STATUS_CODES.NOT_FOUND
            }
        }
        return response;
    }catch(error){
        if(error.name==="ValidationError"){
            let err={};
            Object.keys(error.errors).forEach(key=>{
                err[key]=error.errors[key].message;
            });
            throw {
                err,
                code:STATUS_CODES.UNPROCESSABLE_ENTITY
            }
        }
        throw err;
    }
}
export default {
    createShow,
    getShow,
    deleteShow,
    updateShow
};