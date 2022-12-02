import express from 'express';
import UserController from "./controller";
import UserMiddleware from "./middleware";
import authMiddleware from "../auth/authMiddleware";


const usersRoutes = express.Router();

usersRoutes //defineerin endpointid
    .delete("/following/:id", UserController.unFollowUser) //endpoint ise ja controlleri tegevus
    .post("/following/:id", UserController.followUser)
    .put("/:id", UserMiddleware.checkUpdateUserData, authMiddleware.isAdmin, UserController.changeUser)
    .get("/:id", UserController.getUser)
    .delete("/:id", authMiddleware.isAdmin, UserController.deleteUser )
    .post("/", UserMiddleware.checkNewUserData, UserController.addUser) //middleware kontrollib õigusi/andmete õigsust
export default usersRoutes;
