import bookingControllers from "../controllers/controller.booking.js";
import bookingMiddlewares from "../middlewares/middleware.booking.js";
import authMiddlewares from "../middlewares/middleware.auth.js"
const bookingRoutes=(app)=>{
    app.post(
        "/moviebooking/api/v1/booking",
        authMiddlewares.checkAuthentication,
        bookingMiddlewares.checkBookingCreateReq,
        bookingControllers.create
    );
}

export default bookingRoutes;