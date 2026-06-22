import authControllers from '../controllers/controller.auth.js';
import authMiddlewares from '../middlewares/middleware.auth.js';
const authRoutes=(app)=>{
    app.post('/moviebooking/api/v1/auth/signup',authMiddlewares.checkUserCreateRequest,authControllers.signup);
    app.post('/moviebooking/api/v1/auth/signin',authMiddlewares.checkUserSignin,authControllers.signin);
}
export default authRoutes;