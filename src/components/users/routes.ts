import express from 'express';
import UserController from "./controller";
import UserMiddleware from "./middleware";
import authMiddleware from "../auth/authMiddleware";


const usersRoutes = express.Router();

usersRoutes
    .put("/:id", UserMiddleware.checkUpdateUserData, authMiddleware.isAdmin, UserController.changeUser)
    .get("/:id", UserController.getUser)
    .delete("/:id", authMiddleware.isAdmin, UserController.deleteUser )
    .post("/users", UserMiddleware.checkNewUserData, UserController.addUser)
export default usersRoutes;
