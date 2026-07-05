import moviecontrollers from '../controllers/controller.movie.js';
import moviemiddlewares from "../middlewares/middleware.movie.js";
import authMiddlewares from "../middlewares/middleware.auth.js";

const movieRoutes=(app)=>{
    app.post('/moviebooking/api/v1/movies',
        authMiddlewares.checkAuthentication,
        authMiddlewares.isAdminOrClient,
        moviemiddlewares.checkCreateMovieReq,
        moviecontrollers.postController
    );
    app.get('/moviebooking/api/v1/movies/:id',moviecontrollers.getController);
    app.delete('/moviebooking/api/v1/movies/:id',
        authMiddlewares.checkAuthentication,
        authMiddlewares.isAdminOrClient,
        moviecontrollers.deleteController
    );
    app.put('/moviebooking/api/v1/movies/:id',
        authMiddlewares.checkAuthentication,
        authMiddlewares.isAdminOrClient,
        moviecontrollers.updateController);
    app.patch('/moviebooking/api/v1/movies/:id',
        authMiddlewares.checkAuthentication,
        authMiddlewares.isAdminOrClient,
        moviecontrollers.updateController
    );
    app.get('/moviebooking/api/v1/movies',moviecontrollers.fetchController);
}

export default movieRoutes;