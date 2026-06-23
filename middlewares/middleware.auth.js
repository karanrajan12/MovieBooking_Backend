import ERRresbody from "../utils/errorresponseBody.js";
import errorresponseBody from "../utils/errorresponseBody.js";
import userServices from "../services/service.user.js";
import jwt from 'jsonwebtoken';
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

const checkAuthentication=async(req,res,next)=>{
    try{
        const token=req.headers["x-access-token"];
        if(!token){
            ERRresbody.error="Token is Not Provided";
            return res.status(403).json(ERRresbody);
        }
        const response=jwt.verify(token,process.env.JWT_AUTH_KEY);
        if(!response){
            ERRresbody.error="Token Invalid";
            return res.status(401).json(ERRresbody);
        }
        const user=await userServices.getUserId(response.id);
        req.user=user.id;
    }catch(error){
        if(error.name === "JsonWebTokenError"){
            ERRresbody.error=error.message;
            return res.status(401).json(ERRresbody);
        }
        if(error.code === 404){
            ERRresbody.message="Token Provided for the User doesn't exist"
            return res.status(error.code).json(ERRresbody);
        }
        ERRresbody.error=error;
        console.log(error);
        return(res.status(500).json(ERRresbody));
    }
    next();
}
export default {checkUserCreateRequest,checkUserSignin,checkAuthentication};