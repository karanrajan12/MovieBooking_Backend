import userServices from "../services/service.user.js"
import ERRresbody from "../utils/errorresponseBody.js";
import SUCresbody from "../utils/successresponseBody.js";
import {STATUS_CODES} from "../utils/utility.js";
const updateUser=async(req,res)=>{
    try{
        const response=await userServices.updateUserRoleStatus(req.body,req.params.id);
        SUCresbody.data=response;
        SUCresbody.message="Succesfully Updated the User";
        return res.status(STATUS_CODES.OK).json(SUCresbody);
    }catch(error){
        if(error.err){
            ERRresbody.error=error.err;
            return res.status(error.code).json(ERRresbody);
        }
        ERRresbody.error=error.err;
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(ERRresbody);
    }
}

export default{
    updateUser
};