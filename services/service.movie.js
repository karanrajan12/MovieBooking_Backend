import movieModel from "../models/model.movie.js";

const postMovies=async(body)=>{
    try{
        const data=await movieModel.create(body);
        return data;
    }catch(error){
        if(error.name==="ValidationError"){
            let err={};
            const box=Object.keys(error.errors);
            box.forEach((key)=>{
                err[key]=error.errors[key].message;
            })
            console.log(err);
            return{err:err,statuscode:422};
        }else{
            throw error;
        }
    }
}

const getMovies=async(id)=>{
    try{
        const data=await movieModel.findById(id);
        return data;
    }catch(error){
        if(error.name==="CastError"){
            return {err:"No Movie Found On Database",statuscode:404};
        }else{
            throw error;
        }
    }
}

const deleteMovies=async(id)=>{
    try{
        const data=await movieModel.findById(id);
        return data;
    }catch(error){
        if(error.name==='CastError'){
            return {err:"No Movie Found On Database to Delete",statuscode:404}
        }else{
            throw error;
        }
    }
}

const updateMovies=async(id,newdata)=>{
    try {
        const movie = await movieModel.findByIdAndUpdate(id, newdata, {new: false, runValidators: true});
        return movie;
    } catch (error) {
        if(error.name === 'ValidationError') {
            let err = {};
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message;
            });
            console.log(err);
            return {err: err, code: 422};
        } else {
            throw error;
        }
    }
}

const fetchMovies = async (filter) => {
    let query = {};
    if(filter.name) {
        query.name = filter.name;
    }
    let movies = await movieModel.find(query);
    if(!movies) {
        return {
            err: 'Not able to find the queries movies',
            statuscode: 404
        }
    }
    return movies;
}
export default {postMovies,getMovies,deleteMovies,updateMovies,fetchMovies};