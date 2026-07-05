import userControllers from "../controllers/controller.user.js"

const userRoutes=(app)=>{
    app.patch("/moviebooking/api/v1/user/:id",userControllers.updateUser);
}

export default userRoutes;