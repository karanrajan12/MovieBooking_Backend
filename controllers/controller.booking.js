import SUCresbody from "../utils/successresponseBody.js";
import ERRresbody from "../utils/errorresponseBody.js";
import bookingServices from "../services/service.booking.js";
import {STATUS_CODES} from "../utils/utility.js";

const create = async (req, res) => {
    try {
        let userId = req.user;
        const response = await bookingServices.createBooking({ ...req.body, userId: userId });
        SUCresbody.message = "Successfully created an Booking";
        SUCresbody.data = response;
        return res.status(STATUS_CODES.OK).json(SUCresbody);
    } catch (err) {
        if (err.error) {
            ERRresbody.error = err.error;
            return res.status(err.code).json(ERRresbody);   // ✅ fixed
        }
        ERRresbody.error = err;
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(ERRresbody);
    }
};

export default {create}