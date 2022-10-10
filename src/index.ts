import express from "express"
import UserController from "./components/users/controller";
import UserMiddleware from "./components/users/middleware";
import PostController from "./components/posts/controller";
import LikeController from "./components/likes/controller";

const app = express();
app.use(express.json());

app.get("/", UserController.greeting);
app.get("/users/:id", UserController.getUser)
app.post("/users", UserMiddleware.checkNewUserData, UserController.addUser);
app.put("/users/:id", UserMiddleware.checkUpdateUserData,  UserController.changeUser);
app.delete("/users/:id", UserController.deleteUser );

app.get("/posts/:id", PostController.getPost)
app.post("/posts", PostController.addPost);
app.delete("/posts/:id", PostController.deletePost );

app.get("/likes/:id", LikeController.getLike)
app.post("/likes", LikeController.addLike);
app.delete("/likes/:id", LikeController.deleteLike );



app.listen(3000, () => {
    console.log("Server töötab");
});