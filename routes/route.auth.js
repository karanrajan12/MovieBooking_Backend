import authControllers from '../controllers/controller.auth.js';
import authMiddlewares from '../middlewares/middleware.auth.js';
const authRoutes=(app)=>{
    app.post('/moviebooking/api/v1/auth/signup',authMiddlewares.checkUserCreateRequest,authControllers.signup);
    app.post('/moviebooking/api/v1/auth/signin',authMiddlewares.checkUserSignin,authControllers.signin);
    app.patch('/moviebooking/api/v1/auth/password-reset',authMiddlewares.checkAuthentication,authControllers.resetPassword);
}
export default authRoutes;