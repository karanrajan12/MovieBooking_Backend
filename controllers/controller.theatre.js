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
export default {postController,getController,putController,getAllTheatreController};