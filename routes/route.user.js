import userControllers from "../controllers/controller.user.js"
import userMiddlewares from "../middlewares/middleware.auth.js";
const userRoutes=(app)=>{
    app.patch("/moviebooking/api/v1/user/:id",
        userMiddlewares.checkAuthentication,
        userMiddlewares.validUpdateRequest,
        userMiddlewares.isAdmin,
        userControllers.updateUser);
}

export default userRoutes;