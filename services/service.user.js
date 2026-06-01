import userModel from "../models/model.user.js";

const createUser=async (body)=>{
    try{
        const response=await userModel.create(body);
        return response;
    }catch(err){
        throw err;
    }
}

export default {createUser};