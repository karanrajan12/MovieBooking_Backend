import theatreControllers from '../controllers/controller.theatre.js';
import theatremiddlewares from '../middlewares/middleware.theatre.js'
const theatreRoutes=(app)=>{
    app.post('/moviebooking/api/v1/theatre',theatremiddlewares.checkCreateTheatreReq,theatreControllers.postController);
    app.get('/moviebooking/api/v1/theatre/:id',theatreControllers.getController);
    app.put('/moviebooking/api/v1/theatre/:id',theatreControllers.putController);
    app.patch('/moviebooking/api/v1/theatre/:id',theatremiddlewares.checkCreateTheatreReq,theatreControllers.putController);
    app.get('/moviebooking/api/v1/theatre',theatreControllers.getAllTheatreController);
    app.delete('/moviebooking/api/v1/theatre/:id',theatreControllers.deleteController);
    app.patch('/moviebooking/api/v1/theatre/:id/movies',theatremiddlewares.checkAddMoviesinTheatre,theatreControllers.addMoviesinTheatreController);
}

export default theatreRoutes;