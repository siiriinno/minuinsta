import {Request, Response} from "express";
import User from "./interfaces";
import UserService from "./services";

const UserController = {
    greeting: (req: Request, res: Response) => {
        res.status(200).json({
            message: "Tere tali"
        });
    },
    getUser: (req: Request, res: Response) => {
        const userid = +req.params.id;

        const user = UserService.getUser(userid);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({
                message: "Kasutajat ei leitud"
            })
        }
    },
    addUser: (req: Request, res: Response) => {
        const {name, username, genderID, bio} = req.body;
        const newUser: User = {
            name,
            username,
            genderID,
            bio,
        };
        const id = UserService.addUser(newUser);
        res.status(201).json({
            success: true,
            message: `User with id ${id} created`,
        });
    },
    changeUser: (req: Request, res: Response) => {
        const uid = parseInt(req.params.id);
        const {name, genderID, bio, email, password, profileImageUrl, website} = req.body;
        const result = UserService.updateUser(uid, name, genderID, bio, email, password, profileImageUrl, website);
        if (result) {
            res.status(200).json({
                success: true,
                message: `User with id ${uid} updated`,
            });
        } else {
            res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
    },
    deleteUser: (req: Request, res: Response) => {
        const uid = parseInt(req.params.id);
        const result = UserService.deleteUser(uid);

        if (!result) {
            res.status(404).json({
                success: false,
                message: `User not found`,
            });
        } else {
            res.status(200).json({
                success: true,
                message: `User deleted`,
            });
        }
    },
}
export default UserController;