import mongoose from "mongoose";

const showSchema=new mongoose.Schema({
    theatreId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    movieId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    timings:{
        type:String,
        required:true
    },
    noOfSeats:{
        type:Number,
        reuqired:true
    },
    price:{
        type:Number,
        required:true
    },
    format:{
        type:String
    }
},{timestamps:true})

const showModel=mongoose.model("Shows",showSchema);

export default showModel;