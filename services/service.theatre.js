import theatreModel from "../models/model.theatre.js";
import {STATUS_CODES} from "../utils/utility.js";
const postTheatre=async(body)=>{
    try{
        const theatre=await theatreModel.create(body);
        return theatre;
    }catch(error){
        if(error.name === "ValidationError"){
            let err={};
            Object.keys(error.errors).forEach((key)=>{
                err[key]=error.errors[key].message;
            })
            return{err:err,statuscode:STATUS_CODES.UNPROCESSABLE_ENTITY};
        }
    }
}

const getTheatre=async(id)=>{
    try{
        const response=await theatreModel.findById(id)
        return response;
    }catch(error){
        if(error.name === 'CastError'){
            return {err:"Movie Not found for the given Id",statuscode:STATUS_CODES.NOT_FOUND};
        }
    }
}

const putTheatre=async(id,body)=>{
    try{
        const theatre =await theatreModel.findByIdAndUpdate(id,body);
        return theatre
    }catch(error){
        if(error.name === 'CastError'){
            return {err:"Movie Not found for the given Id So can't able to Update",statuscode:STATUS_CODES.NOT_FOUND};
        }
    }
}

const getAllTheatres=async(data)=>{
    try{
        let query={};
        let pagination={};
        if(data && data.city){
            query.city=data.city;
        }
        if(data && data.pincode){
            query.pincode=data.pincode;
        }
        if(data && data.name){
            query.name=data.name;
        }
        if(data && data.limit){
            pagination.limit=data.limit;
        }
        if(data && data.skip){
            let perpage=0;
            if(data.limit){
                perpage=data.limit;
            }else{
                perpage=3;
            }
            pagination.skip=data.skip*perpage;
        }
        const theatres=await theatreModel.find(query,{},pagination);
        return theatres;
    }catch(error){
        console.log(error);
        throw error;
    }
}

const deleteTheatre = async (id) => {
    try {
        const theatre = await theatreModel.findByIdAndDelete(id);
        if(!theatre) {
            return {
                err: "No record of a theatre found for the given id",
                code: STATUS_CODES.NOT_FOUND
            }
        }
        return theatre;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const addMoviesinTheatre=(async(theatreId,movieId,insert)=>{
    const theatre=await theatreModel.findById(theatreId);
    if(!theatre){
        return{
            err:"No Such Id Found for Given ID",
            statuscode:STATUS_CODES.NOT_FOUND
        }
    }
    if(insert){
        movieId.forEach((id)=>{
            theatre.movies.push(id)
        })
    }else{
        theatre.movies = theatre.movies.filter(
            (availableId) => !movieId.includes(availableId.toString())
        );
    }
    await theatre.save();
    return theatre.populate('movies');
})
const checkMovieInATheatre = async (theatreId, movieId) => {
    try {
        let response = await theatreModel.findById(theatreId);
        if(!response) {
            return {
                err: "No such theatre found for the given id",
                code: STATUS_CODES.NOT_FOUND
            }
        }
        return response.movies.indexOf(movieId) != -1;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
const updateMoviesInTheatres = async (theatreId, movieIds, insert) => {
    try {
        let theatre;
        if (insert) {
            theatre = await theatreModel.findByIdAndUpdate(
                {_id: theatreId},
                {$addToSet: {movies: {$each: movieIds}}},
                {new: true}
            );
        } else {
            theatre = await theatreModel.findByIdAndUpdate(
                {_id: theatreId},
                {$pull: {movies: {$in: movieIds}}},
                {new: true}
            );
        }

        return theatreModel.populate('movies');
    } catch (error) {
        if(error.name === 'TypeError') {
            return {
                code: STATUS_CODES.NOT_FOUND,
                err: 'No theatre found for the given id'
            }
        }
        console.log("Error is", error);
        throw error;
    }
}
export default {postTheatre,getTheatre,putTheatre,getAllTheatres,deleteTheatre,addMoviesinTheatre,checkMovieInATheatre,updateMoviesInTheatres};