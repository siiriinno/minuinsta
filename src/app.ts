import express from "express";
import cors from "cors";
import UserController from "./components/users/controller";
import authMiddleware from "./components/auth/authMiddleware";

import usersRoutes from "./components/users/routes";
import postsRoutes from "./components/posts/routes";
import likesRoutes from "./components/likes/routes";
import apicache from 'apicache'

// tegevused õiges järjekorras, muidu ei tööta
const app = express();
let cache = apicache.middleware
app.use(cache('5 minutes'))

app.use(express.json()); //middleware
app.use(cors()); //veebiaadrssite lubamine, brauser nõuab seda, kust on lubatud API poole pöörduda

app.get("/", UserController.greeting);
app.post("/login", UserController.login);
app.use(authMiddleware.isLoggedIn);
app.use("/users", usersRoutes); //middleware
app.use("/posts", postsRoutes); //middleware
app.use("/likes", likesRoutes); //middleware

export default app;


