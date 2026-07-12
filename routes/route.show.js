import showControllers from "../controllers/controller.show.js"
import showMiddlewares from "../middlewares/middleware.show.js";
import authMiddlewares from "../middlewares/middleware.auth.js";

const showRoutes=(app)=>{
    app.post(
        "/moviebooking/api/v1/shows",
        authMiddlewares.checkAuthentication,
        authMiddlewares.isAdminOrClient,
        showMiddlewares.validateCreateShowRequest,
        showControllers.create
    );

    app.get(
        "/moviebooking/api/v1/shows",
        showControllers.getShow
    );

    app.delete(
        "/moviebooking/api/v1/shows/:id",
        authMiddlewares.checkAuthentication,
        authMiddlewares.isAdminOrClient,
        showControllers.deleteShow
    );

    app.patch(
        "/moviebooking/api/v1/shows/:id",
        authMiddlewares.checkAuthentication,
        authMiddlewares.isAdminOrClient,
        showControllers.updateShow
    );
}

export default showRoutes;