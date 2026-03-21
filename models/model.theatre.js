import mongoose from "mongoose";
const theatreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5
    },
    description: String,
    city: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    address: String,
    movies:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Movies'
    }
}, {timestamps: true});

const theatreModel = mongoose.model('Theatre', theatreSchema);

export default theatreModel;