import {Request, Response} from "express";
import User from "./interfaces";
import UserService from "./services";
import authServices from "../auth/services";

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
    addUser:async (req: Request, res: Response) => {
        const {name, username, genderID, bio, password} = req.body;
        const hashedPassword = await authServices.hash(password);
        const newUser: User = {
            name,
            username,
            genderID,
            bio,
            password: hashedPassword,
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
    login: async (req: Request, res: Response) => {
        const {username, password} = req.body;
        const user = UserService.getUserbyUsername(username);
        if (user) {
            const passwordControl = await authServices.compare(password, user.password);
            if (!passwordControl) {
                res.status(401).json({
                    success: false,
                    message: `Wrong credentials`,
                });
            } else {
                res.status(200).json({
                    success: true,
                    message: `OK`,
                });
            }
        } else {
            res.status(401).json({
                success: false,
                message: `Wrong credentials`,
            });
        }
    }
}
export default UserController;