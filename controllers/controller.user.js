import userServices from "../services/service.user.js"
import ERRresbody from "../utils/errorresponseBody.js";
import SUCresbody from "../utils/successresponseBody.js";

const updateUser=async(req,res)=>{
    try{
        const response=await userServices.updateUserRoleStatus(req.body,req.params.id);
        SUCresbody.data=response;
        SUCresbody.message="Succesfully Updated the User";
        return res.status(200).json(SUCresbody);
    }catch(error){
        if(error.err){
            ERRresbody.error=error.err;
            return res.status(error.code).json(ERRresbody);
        }
        ERRresbody.error=error.err;
        return res.status(500).json(ERRresbody);
    }
}

export default{
    updateUser
};