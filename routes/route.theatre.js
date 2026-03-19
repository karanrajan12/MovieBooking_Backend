import theatreControllers from '../controllers/controller.theatre.js';
import theatremiddlewares from '../middlewares/middleware.theatre.js'
const theatreRoutes=(app)=>{
    app.post('/moviebooking/api/v1/theatre',theatremiddlewares.checkCreateTheatreReq,theatreControllers.postController);
    app.get('/moviebooking/api/v1/theatre/:id',theatreControllers.getController);
    app.put('/moviebooking/api/v1/theatre/:id',theatreControllers.putController);
    app.patch('/moviebooking/api/v1/theatre/:id',theatreControllers.putController);
    app.get('/moviebooking/api/v1/theatre',theatreControllers.getAllTheatreController);
}

export default theatreRoutes;