import authControllers from '../controllers/controller.auth.js';

const authRoutes=(app)=>{
    app.post('/moviebooking/api/v1/auth/signup',authControllers.signup);
}

export default authRoutes;