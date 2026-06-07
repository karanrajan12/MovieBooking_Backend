import userModel from "../models/model.user.js";

const createUser=async (body)=>{
    try{
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