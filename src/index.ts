import express from "express"
import UserController from "./components/users/controller";
import UserMiddleware from "./components/users/middleware";

const app = express();
app.use(express.json());

app.get("/", UserController.greeting);
app.get("/users/:id", UserController.getUser)
app.post("/users", UserMiddleware.checkNewUserData, UserController.addUser);
app.put("/users/:id", UserMiddleware.checkUpdateUserData,  UserController.changeUser);
app.delete("/users/:id", UserController.deleteUser );


app.listen(3000, () => {
    console.log("Server töötab");
});