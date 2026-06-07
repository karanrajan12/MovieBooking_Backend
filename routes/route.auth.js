import authControllers from '../controllers/controller.auth.js';
import checkUserCreateRequest from '../middlewares/middleware.auth.js';
const authRoutes=(app)=>{
    app.post('/moviebooking/api/v1/auth/signup',checkUserCreateRequest,authControllers.signup);
}

export default authRoutes;