import bookingControllers from "../controllers/controller.booking.js";
import bookingMiddlewares from "../middlewares/middleware.booking.js";
import authMiddlewares from "../middlewares/middleware.auth.js"
const bookingRoutes=(app)=>{
    app.post(
        "/moviebooking/api/v1/booking",
        authMiddlewares.checkAuthentication,
        bookingMiddlewares.checkBookingCreateReq,
        bookingControllers.create
    )
    app.patch(
        "/moviebooking/api/v1/booking/:id",
        authMiddlewares.checkAuthentication,
        bookingMiddlewares.canStatusChange,
        bookingControllers.update
    );
}

export default bookingRoutes;