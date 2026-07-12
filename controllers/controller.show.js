import showServices from "../services/service.show.js";
import {STATUS_CODES} from "../utils/utility.js";
import SUCresbody from "../utils/successresponseBody.js";
import ERRresbody from "../utils/errorresponseBody.js";
const create=async(req,res)=>{
    try{
        const response=await showServices.createShow(req.body);
        SUCresbody.data=response;
        SUCresbody.message="Successfully created the show";
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

const getShow=async(req,res)=>{
    try{
        const response=await showServices.getShow(req.query);
        SUCresbody.data=response;
        SUCresbody.message="Successfully fetched the movie Shows";
        return res.status(STATUS_CODES.OK).json(SUCresbody);
    }catch(error){
        if(error.err){
            ERRresbody.error=err;
            return res.status(error.code).josn(ERRresbody);
        }
        ERRresbody.error=error;
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(ERRresbody);
    }
}

const deleteShow=async(req,res)=>{
    try{
        const response=await showServices.deleteShow(req.params.id);
        SUCresbody.message="Succesfully deleted the show";
        SUCresbody.data=response;
        return res.status(STATUS_CODES.OK).json(SUCresbody);
    }catch(error){
        if(error.err){
            ERRresbody.error=error.err;
            return res.status(error.code).json(ERRresbody);
        }
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(ERRresbody);
    }
}

const updateShow=async(req,res)=>{
    try{
        const response=await showServices.updateShow(req.params.id,req.body);
        SUCresbody.data=response;
        SUCresbody.message="Successfully updated the theatre";
        return res.status(STATUS_CODES.OK).json(SUCresbody);
    }catch(error){
        if(error.err){
            ERRresbody.error=error.err;
            return res.status(error.err).json(ERRresbody);
        }
        ERRresbody.error=error;
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(ERRresbody);
    }
}


export default {
    create,
    getShow,
    deleteShow,
    updateShow
};