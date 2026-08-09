import paymentController from "../controllers/controller.payment.js"
import authMiddlewares from "../middlewares/middleware.auth.js";
const paymentRoutes=(app)=>{
        app.post(
            "/moviebooking/api/v1/payments",
            paymentController.create
        );
        app.get(
            "/moviebooking/api/v1/payments/:id",
            authMiddlewares.checkAuthentication,
            paymentController.getPaymentDetails
        )
}

export default paymentRoutes;