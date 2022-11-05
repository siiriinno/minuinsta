import express from "express";
import cors from "cors";
import UserController from "./components/users/controller";
import authMiddleware from "./components/auth/authMiddleware";
import config from './apiConfig';
import usersRoutes from "./components/users/routes";
import postsRoutes from "./components/posts/routes";
import likesRoutes from "./components/likes/routes";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", UserController.greeting);
app.post("/login", UserController.login);
app.use(authMiddleware.isLoggedIn);
app.use("/users", usersRoutes);
app.use("/posts", postsRoutes);
app.use("/likes", likesRoutes);

app.listen(config.port, () => {
    console.log("Server töötab");
});


