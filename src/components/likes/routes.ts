import express from "express";
import LikeController from "./controller";
import authMiddleware from "../auth/authMiddleware";

const likesRoutes = express.Router();

likesRoutes
    .get("/:id", LikeController.getLike)
    .post("/", LikeController.addLike)
    .delete("/:id", authMiddleware.isAdmin, LikeController.deleteLike);

export default likesRoutes
