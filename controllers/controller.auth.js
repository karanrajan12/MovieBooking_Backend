import userServices from '../services/service.user.js';
import ERRresbody from "../utils/errorresponseBody.js";
import SUCresbody from "../utils/successresponseBody.js";
const signup=async (req,res)=>{
    try{
        const response=await userServices.createUser(req.body);
        SUCresbody.data=response;
        SUCresbody.message="Successfully Registered an User";
        return res.status(201).json(SUCresbody);
    }catch(err){
        if(err.err){
            ERRresbody.error=err.err;
            return res.status(err.code).json(ERRresbody);
        }
        ERRresbody.error=err;
        res.status(500).json(ERRresbody);
    }
}

export default {signup};