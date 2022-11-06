import express from 'express';
import UserController from "./controller";
import UserMiddleware from "./middleware";
import authMiddleware from "../auth/authMiddleware";


const usersRoutes = express.Router();

usersRoutes
    .delete("/following/:id", UserController.unFollowUser)
    .post("/following/:id", UserController.followUser)
    .put("/:id", UserMiddleware.checkUpdateUserData, authMiddleware.isAdmin, UserController.changeUser)
    .get("/:id", UserController.getUser)
    .delete("/:id", authMiddleware.isAdmin, UserController.deleteUser )
    .post("/", UserMiddleware.checkNewUserData, UserController.addUser)
export default usersRoutes;
