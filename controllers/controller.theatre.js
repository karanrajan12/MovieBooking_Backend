import theatreService from '../services/service.theatre.js';
import ERRresbody from "../utils/errorresponseBody.js";
import SUCresbody from "../utils/successresponseBody.js";

const postController=async(req,res)=>{
    try{
        const response=await theatreService.postTheatre(req.body);
        if(response.err){
            ERRresbody.error=response.err;
            res.status(response.statuscode).json(ERRresbody);
        }else{
            SUCresbody.data=response;
            res.status(201).json(SUCresbody);
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
            res.status(201).json(SUCresbody);
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
            res.status(201).json(SUCresbody);
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
        res.status(201).json(SUCresbody);
    }catch(error){
        ERRresbody.error=error;
        res.status(500).json(ERRresbody);
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
        return res.status(200).json(SUCresbody);
    } catch (error) {
        ERRresbody.err = error;
        return res.status(500).json(ERRresbody);
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
        return res.status(200).json(SUCresbody);
    }catch(error){
        console.log(error);
        ERRresbody.err = error;
        return res.status(500).json(ERRresbody);
    }
})
export default {postController,getController,putController,getAllTheatreController,deleteController,addMoviesinTheatreController};