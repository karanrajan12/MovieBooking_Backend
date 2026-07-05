import ERRresbody from "../utils/errorresponseBody.js";
import errorresponseBody from "../utils/errorresponseBody.js";
import userServices from "../services/service.user.js";
import {USER_TYPE,USER_STATUS} from '../utils/utility.js';
import jwt from 'jsonwebtoken';
import {STATUS_CODES} from "../utils/utility.js";
const checkUserCreateRequest=async(req,res,next)=>{
    if(!req.body.userName){
        ERRresbody.error="UserName is Not Provided";
        return res.status(STATUS_CODES.BAD_REQUEST).json(ERRresbody)
    };
    if(!req.body.email){
        ERRresbody.error="E-Mail is Not Provided";
        return res.status(STATUS_CODES.BAD_REQUEST).json(ERRresbody)
    };
    if(!req.body.password){
        ERRresbody.error="Password is Not Provided";
        return res.status(STATUS_CODES.BAD_REQUEST).json(ERRresbody)
    };
    next();
}

const checkUserSignin=async(req,res,next)=>{
    if(!req.body.email){
        ERRresbody.error="E-Mail is Not Provided";
        return res.status(STATUS_CODES.BAD_REQUEST).json(ERRresbody);
    }
    if(!req.body.password){
        ERRresbody.error="Password is Not Provided";
        return res.status(STATUS_CODES.BAD_REQUEST).json(ERRresbody);
    }
    next();
}

const checkAuthentication = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"];

        if (!token) {
            ERRresbody.error = "Token is Not Provided";
            return res
                .status(STATUS_CODES.FORBIDDEN)
                .json(ERRresbody);
        }

        const response = jwt.verify(
            token,
            process.env.JWT_AUTH_KEY
        );

        const user = await userServices.getUserId(response.id);

        // ✅ Store user ID for next middleware
        req.userId = user.id;

        next();

    } catch (error) {

        if (error.name === "JsonWebTokenError") {
            ERRresbody.error = error.message;

            return res
                .status(STATUS_CODES.UNAUTHORISED)
                .json(ERRresbody);
        }

        if (error.code === STATUS_CODES.NOT_FOUND) {
            ERRresbody.error =
                "Token provided for a user that doesn't exist";

            return res
                .status(error.code)
                .json(ERRresbody);
        }

        console.log(error);
        ERRresbody.error = error.message || error;

        return res
            .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
            .json(ERRresbody);
    }
};

const validUpdateRequest=async(req,res,next)=>{
    if(!(req.body.userType || req.body.userStatus)) {
        ERRresbody.error = 'Wrong request, please send atleast one parameter';
        return res.status(STATUS_CODES.BAD_REQUEST).json(ERRresbody);
    }
    next();
}
const isAdmin=async(req,res,next)=>{
    const user=await userServices.getUserId(req.params.id);
    if(user.userType!=USER_TYPE.admin){
        ERRresbody.error="User is not an ADMIN - cannot proceed with the request";
        return res.status(STATUS_CODES.NOT_FOUND).json(ERRresbody);
    }
    next();
}

const isClient=async(req,res,next)=>{
    const user=await userServices.getUserId(req.userId);
    if(user.userType!=USER_TYPE.client){
        ERRresbody.error="User is not an CLIENT - cannot proceed with the request";
        return res.status(STATUS_CODES.UNAUTHORISED).json(ERRresbody);
    }
    next();
}

const isAdminOrClient = async (req, res, next) => {
    try {
        const user = await userServices.getUserId(req.userId);

        if (
            user.userType !== USER_TYPE.admin &&
            user.userType !== USER_TYPE.client
        ) {
            ERRresbody.error =
                "User is not an ADMIN or CLIENT - cannot proceed with the request";

            return res
                .status(STATUS_CODES.UNAUTHORISED)
                .json(ERRresbody);
        }

        next();

    } catch (error) {
        console.log("ACTUAL ERROR:", error);

        ERRresbody.error =
            error.err || error.message || "Internal Server Error";

        return res
            .status(error.code || STATUS_CODES.INTERNAL_SERVER_ERROR)
            .json(ERRresbody);
    }
};


export default {checkUserCreateRequest,checkUserSignin,checkAuthentication,
    validUpdateRequest,
    isAdmin,
    isClient,
    isAdminOrClient
};