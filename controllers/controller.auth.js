import jwt from 'jsonwebtoken';
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

const signin=async (req,res)=>{
    try{
        const response=await userServices.checkUserEmail(req.body.email);
        const ValidPassword=await response.isValidPassword(req.body.password);
        if(!ValidPassword){
            throw {err: 'Invalid password for the given email', code: 401};
        }
        const token=jwt.sign(
            {id:response.id,email:response.email},
            process.env.JWT_AUTH_KEY,
            {expiresIn:"1h"}
        );
        SUCresbody.message = "Successfully logged in";
        SUCresbody.data = {
            email: response.email,
            role: response.userType,
            status: response.userStatus,
            token: token
        };
        return res.status(200).json(SUCresbody);
    }catch(error){
        if(error.err) {
            ERRresbody.err = error.err;
            return res.status(error.code).json(ERRresbody);
        }
        console.log(error);
        ERRresbody.err = error;
        return res.status(500).json(ERRresbody);
    }
}

export default {
    signup,
    signin
};