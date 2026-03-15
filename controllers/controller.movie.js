import movieservices from '../services/service.movie.js'
import ERRresbody from "../utils/errorresponseBody.js";
import SUCresbody from "../utils/successresponseBody.js";

const postController=async(req,res)=>{
    const response=await movieservices.postMovies(req.body);
    if(response.err){
        ERRresbody.error=response.err;
        res.status(response.statuscode).json(ERRresbody);
    }
    SUCresbody.data=response;
    res.status(201).json(SUCresbody);
}

const getController=async(req,res)=>{
    const id=req.params.id;
    const response= await movieservices.getMovies(id)
    if(response.err){
        ERRresbody.error=response.err;
        return res.status(response.statuscode).json(ERRresbody);
    }
    SUCresbody.data=response;
    return res.status(201).json(SUCresbody);
}

const deleteController=async(req,res)=>{
    const id=req.params.id;
    const response=await movieservices.deleteMovies(id);
    if(response.err){
        ERRresbody.error=response.err;
        return res.status(response.statuscode).json(ERRresbody);
    }
    SUCresbody.data=response;
    return res.status(201).json(SUCresbody);
}

const updateController=async(req,res)=>{
    try {
        const response = await movieservices.updateMovies(req.params.id, req.body);
        if(response.err) {
            ERRresbody.err = response.err;
            ERRresbody.message = "The updates that we are trying to apply doesn't validate the schema";
            return res.status(response.code).json(ERRresbody);
        }
        SUCresbody.data = response;
        return res.status(200).json(SUCresbody);
    } catch (err) {
        console.log(err);
        ERRresbody.err = err;
        return res.status(500).json(ERRresbody);
    }
}

const fetchController = async (req, res) => {
    try {
        const response = await movieservices.fetchMovies(req.query);
        if(response.err) {
            ERRresbody.err = response.err;
            return res.status(response.statuscode).json(ERRresbody);
        }
        SUCresbody.data = response;
        return res.status(200).json(SUCresbody);
    } catch (error) {
        console.log(error);
        ERRresbody.err = error;
        return res.status(500).json(ERRresbody);
    }
}

export default {postController,getController,deleteController,updateController,fetchController};