import express from "express"
import UserController from "./components/users/controller";
import UserMiddleware from "./components/users/middleware";
import PostController from "./components/posts/controller";
import LikeController from "./components/likes/controller";
import authMiddleware from "./components/auth/authMiddleware";
import config from './apiConfig';

const app = express();
app.use(express.json());

app.get("/", UserController.greeting);
app.post("/login", UserController.login);
app.post("/users", UserMiddleware.checkNewUserData, UserController.addUser);
app.use(authMiddleware.isLoggedIn);

app.get("/users/:id", UserController.getUser)

app.put("/users/:id", UserMiddleware.checkUpdateUserData, authMiddleware.isAdmin, UserController.changeUser);
app.delete("/users/:id", authMiddleware.isAdmin, UserController.deleteUser );

app.get("/posts/:id", PostController.getPost)
app.post("/posts", PostController.addPost);
app.delete("/posts/:id", authMiddleware.isAdmin, PostController.deletePost );

app.get("/likes/:id", LikeController.getLike)
app.post("/likes", LikeController.addLike);
app.delete("/likes/:id", authMiddleware.isAdmin, LikeController.deleteLike );



app.listen(config.port, () => {
    console.log("Server töötab");
});

//routes.ts fail teha ja endpointide struktureerimine teha
