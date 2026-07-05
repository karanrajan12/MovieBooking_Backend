import theatreService from '../services/service.theatre.js';
import ERRresbody from "../utils/errorresponseBody.js";
import SUCresbody from "../utils/successresponseBody.js";
import {STATUS_CODES} from "../utils/utility.js";

const postController=async(req,res)=>{
    try{
        const response=await theatreService.postTheatre(req.body);
        if(response.err){
            ERRresbody.error=response.err;
            res.status(response.statuscode).json(ERRresbody);
        }else{
            SUCresbody.data=response;
            res.status(STATUS_CODES.CREATED).json(SUCresbody);
        }
    }catch(error){
        throw error;
    }
}

const getController=async(req,res)=>{
    const id=req.params.id;
    try{
        const response=await theatreService.getTheatre(id);
        if(response.err){
            ERRresbody.error=response.err;
            res.status(response.statuscode).json(ERRresbody);
        }else{
            SUCresbody.data=response;
            res.status(STATUS_CODES.CREATED).json(SUCresbody);
        }
    }catch(error){
        console.log(error);
        throw error;
    }
}

const putController=async(req,res)=>{
    try{
        const response=await theatreService.putTheatre(req.params.id,req.body);
        if(response.err){
            ERRresbody.error=response.err;
            res.status(response.statuscode).json(ERRresbody);
        }else{
            SUCresbody.data=response;
            res.status(STATUS_CODES.CREATED).json(SUCresbody);
        }
    }catch(error){
        console.log(error);
        throw error;
    }
}

const getAllTheatreController=async(req,res)=>{
    try{
        const response=await theatreService.getAllTheatres(req.query);
        SUCresbody.data=response;
        res.status(STATUS_CODES.CREATED).json(SUCresbody);
    }catch(error){
        ERRresbody.error=error;
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(ERRresbody);
    }
}

const deleteController = async (req, res) => {
    try {
        const response = await theatreService.deleteTheatre(req.params.id);
        if(response.err) {
            ERRresbody.err = response.err;
            return res.status(response.code).json(ERRresbody);
        }
        SUCresbody.data = response;
        SUCresbody.message = "Successfully deleted the given theatre";
        return res.status(STATUS_CODES.OK).json(SUCresbody);
    } catch (error) {
        ERRresbody.err = error;
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(ERRresbody);
    }
}

const addMoviesinTheatreController=(async(req,res)=>{
    try{
        const response=await theatreService.addMoviesinTheatre(req.params.id,req.body.movieIds,req.body.insert);
        if(response.err) {
            ERRresbody.err = response.err;
            return res.status(response.code).json(ERRresbody);
        }
        SUCresbody.data = response;
        SUCresbody.message = "Successfully updated movies in the theatre";
        return res.status(STATUS_CODES.OK).json(SUCresbody);
    }catch(error){
        console.log(error);
        ERRresbody.err = error;
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(ERRresbody);
    }
})
const checkMovieController = async (req, res) => {
    try {
        const response = await theatreService.checkMovieInATheatre(req.params.theatreId,req.params.movieId);
        if(response.err) {
            ERRresbody.err = response.err;
            return res.status(response.status).json(ERRresbody);
        }
        SUCresbody.data = response;
        SUCresbody.message = "Successfully checked if movie is present in the theatre";
        return res.status(STATUS_CODES.OK).json(SUCresbody);
    } catch (error) {
        ERRresbody.err = error;
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(ERRresbody);
    }
}
const updateMoviesController = async (req, res) => {
    try {
        const response = await theatreService.updateMoviesInTheatres(
            req.params.id,
            req.body.movieIds,
            req.body.insert
        );
        if(response.err) {
            ERRresbody.err = response.err;
            return res.status(response.code).json(ERRresbody);
        }
        SUCresbody.data = response;
        SUCresbody.message = "Successfully updated movies in the theatre";
        return res.status(STATUS_CODES.OK).json(SUCresbody);
    } catch (error) {
        console.log(error);
        ERRresbody.err = error;
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(ERRresbody);
    }
}

export default {postController,getController,putController,getAllTheatreController,deleteController,addMoviesinTheatreController,checkMovieController,updateMoviesController};