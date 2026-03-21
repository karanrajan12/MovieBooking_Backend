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

const checkAddMoviesinTheatre=((req,res,next)=>{
    if(req.body.insert === undefined) {
        badresBody.message = "The insert parameter is missing in the request";
        return res.status(400).json(badresBody);
    }
    if(!req.body.movieIds) {
        badresBody.message = "No movies present in the request to be updated in theatre";
        return res.status(400).json(badresBody);
    }
    if(!(req.body.movieIds instanceof Array)) {
        badresBody.message = "Expected array of movies but found something else";
        return res.status(400).json(badresBody);
    }
    if(req.body.movieIds.length === 0) {
        badresBody.message = "No movies present in the array provided";
        return res.status(400).json(badresBody);
    }
    next();
})

export default {checkCreateTheatreReq,checkAddMoviesinTheatre};