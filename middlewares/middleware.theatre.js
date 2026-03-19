import badresBody from "../utils/badresponseBody.js";

const checkCreateTheatreReq=((req,res,next)=>{
    if(!req.body.name) {
        badresBody.error = "The name of the theatre is not present in the request";
        return res.status(400).json(badresBody)
    }
    if(!req.body.pincode) {
        badresBody.error = "The pincode of the theatre is not present in the request";
        return res.status(400).json(badresBody);
    }
    if(!req.body.city) {
        badresBody.error = "The city of the theatre is not present";
        return res.status(400).json(badresBody);
    }
    next();
})

export default {checkCreateTheatreReq};