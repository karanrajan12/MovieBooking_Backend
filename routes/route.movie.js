import moviecontrollers from '../controllers/controller.movie.js';

const movieRoutes=(app)=>{
    app.post('/moviebooking/api/v1/movies',moviecontrollers.postController);
    app.get('/moviebooking/api/v1/movies/:id',moviecontrollers.getController);
    app.delete('/moviebooking/api/v1/movies/:id',moviecontrollers.deleteController);
    app.put('/moviebooking/api/v1/movies/:id',moviecontrollers.updateController);
    app.patch('/moviebooking/api/v1/movies/:id',moviecontrollers.updateController);
    app.get('/moviebooking/api/v1/movies',moviecontrollers.fetchController);
}

export default movieRoutes;