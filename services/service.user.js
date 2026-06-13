import userModel from "../models/model.user.js";
import {USER_TYPE,USER_STATUS} from "../utils/utility.js";


const createUser=async (body)=>{
    try{
        if(!body.userType || body.userType === USER_TYPE.customer){
            if(body.userStatus && body.userStatus != USER_STATUS.approved){
                throw {
                    err: "We cannot set any other status for customer",
                    code: 400
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

                throw { err: error,code: 422 };
            }
            throw err;
        }
}

export default {createUser};