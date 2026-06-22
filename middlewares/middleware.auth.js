import ERRresbody from "../utils/errorresponseBody.js";
import errorresponseBody from "../utils/errorresponseBody.js";

const checkUserCreateRequest=async(req,res,next)=>{
    if(!req.body.userName){
        ERRresbody.error="UserName is Not Provided";
        return res.status(400).json(ERRresbody)
    };
    if(!req.body.email){
        ERRresbody.error="E-Mail is Not Provided";
        return res.status(400).json(ERRresbody)
    };
    if(!req.body.password){
        ERRresbody.error="Password is Not Provided";
        return res.status(400).json(ERRresbody)
    };
    next();
}

const checkUserSignin=async(req,res,next)=>{
    if(!req.body.email){
        ERRresbody.error="E-Mail is Not Provided";
        return res.status(400).json(ERRresbody);
    }
    if(!req.body.password){
        ERRresbody.error="Password is Not Provided";
        return res.status(400).json(ERRresbody);
    }
    next();
}
export default {checkUserCreateRequest,checkUserSignin};