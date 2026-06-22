import authControllers from '../controllers/controller.auth.js';
import checkUserCreateRequest from '../middlewares/middleware.auth.js';
const authRoutes=(app)=>{
    app.post('/moviebooking/api/v1/auth/signup',checkUserCreateRequest,authControllers.signup);
    app.post('/moviebooking/api/v1/auth/signin',authControllers.signin);
}
export default authRoutes;