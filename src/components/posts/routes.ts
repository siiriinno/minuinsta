import express from "express";
import PostController from "./controller";
import authMiddleware from "../auth/authMiddleware";

const postsRoutes = express.Router();

postsRoutes
    .get("/:id", PostController.getPost)
    .post("/", PostController.addPost)
    .delete("/:id", authMiddleware.isAdmin, PostController.deletePost );

export default postsRoutes
