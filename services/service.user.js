import userModel from "../models/model.user.js";
import {USER_TYPE,USER_STATUS,STATUS_CODES} from "../utils/utility.js";


const createUser=async (body)=>{
    try{
        if(!body.userType || body.userType === USER_TYPE.customer){
            if(body.userStatus && body.userStatus != USER_STATUS.approved){
                throw {
                    err: "We cannot set any other status for customer",
                    code: STATUS_CODES.BAD_REQUEST
                };
            }
        }
        if(body.userType && body.userType != USER_TYPE.customer) {
            body.userStatus = USER_STATUS.pending;
        }
        const response=await userModel.create(body);
        return response;
    } catch(err){
            if(err.name === "ValidationError"){
                let error = {};
                Object.keys(err.errors).forEach((key) => {
                    error[key] = err.errors[key].message;
                });

                throw { err: error,code: STATUS_CODES.UNPROCESSABLE_ENTITY };
            }
            throw err;
        }
}

const checkUserEmail=async(email)=>{
    try {
        const response = await userModel.findOne({
            email: email
        });
        if(!response) {
            throw {err: "No user found for the given email", code: 404};
        }
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getUserId=async (id)=>{
    try{
        const response=await userModel.findById(id);
        if(!response){
            throw{
                err:"No User Found with the Given Id",
                code:STATUS_CODES.NOT_FOUND
            }
        }
        return response;
    }catch(error){
        throw error;
    }
}

const updateUserRoleStatus=async(data,userId)=>{
    try{
        let updatedQuery={};
        if(data.userStatus){
            updatedQuery.userStatus=data.userStatus;
        };
        if(data.userType){
            updatedQuery.userType=data.userType;
        };

        const response=await userModel.findOneAndUpdate(
            {_id:userId},
            updatedQuery,
            {new:true,runValidators:true}
        );
        if(!response){
            throw{
                err:"User not found for the given id",
                code:STATUS_CODES.NOT_FOUND
            }
        }
        return response;
    }catch(error){
        if(error.name==="ValidationError"){
            throw {
                err:"The Properties does not validate the constraints",
                code:STATUS_CODES.NOT_FOUND
            }
        }
        console.log(error);
        throw error;
    }
}

export default {
    createUser,
    checkUserEmail,
    getUserId,
    updateUserRoleStatus
};