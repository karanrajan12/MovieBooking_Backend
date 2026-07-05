import badresBody from "../utils/badresponseBody.js";
import {STATUS_CODES} from "../utils/utility.js";
const checkCreateMovieReq=((req,res,next)=>{
    if(!req.body.name) {
        badresBody.error = "The name of the movie is not present in the request";
        return res.status(STATUS_CODES.BAD_REQUEST).json(badresBody);
    }
    if(!req.body.description) {
        badresBody.error = "The description of the movie is not present in the request";
        return res.status(STATUS_CODES.BAD_REQUEST).json(badresBody);
    }
    if(!req.body.casts ||
        !(req.body.casts instanceof Array) ||
        req.body.casts.length <= 0
    ) {
        badresBody.error = "The casts of the movie is not present in the request";
        return res.status(STATUS_CODES.BAD_REQUEST).json(badresBody);
    }
    if(!req.body.trailerUrl) {
        badresBody.error = "The trailerUrl of the movie is not present in the request";
        return res.status(STATUS_CODES.BAD_REQUEST).json(badresBody);
    }
    if(!req.body.releaseDate) {
        badresBody.error = "The releaseDate of the movie is not present in the request";
        return res.status(STATUS_CODES.BAD_REQUEST).json(badresBody);
    }
    if(!req.body.director) {
        badresBody.error = "The director of the movie is not present in the request";
        return res.status(STATUS_CODES.BAD_REQUEST).json(badresBody);
    }
    next();
})

export default {checkCreateMovieReq};