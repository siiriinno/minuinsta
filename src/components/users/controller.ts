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
    getUser: async (req: Request, res: Response) => {
        const userid = +req.params.id;

        const user = await UserService.getUser(userid);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({
                message: "Kasutajat ei leitud"
            })
        }
    },
    addUser: async (req: Request, res: Response) => {
        const {name, username, genderID, bio, password} = req.body;
        const hashedPassword = await authServices.hash(password);
        const newUser: User = {
            Name: name,
            Username: username,
            GenderID: genderID,
            Bio: bio,
            Password: hashedPassword,
            Role: 2
        };
        const tmp = await UserService.addUser(newUser);
        console.log(tmp)// { affectedRows: 1, insertId: 202n, warningStatus: 0 }

        res.status(201).json({
            success: true,
            message: `User with id ${tmp.insertId} created`,
        });
    },
    changeUser: async (req: Request, res: Response) => {
        const uid = parseInt(req.params.id);
        const {name, genderID, bio, email, password, profileImageUrl, website} = req.body;
        const result: any = await UserService.updateUser(uid, name, genderID, bio, email, password, profileImageUrl, website);
        if (result && result.affectedRows) {
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
    deleteUser: async (req: Request, res: Response) => {
        const uid = parseInt(req.params.id);
        const result = await UserService.deleteUser(uid);

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
        const user: User = await UserService.getUserbyUsername(username);
        //console.log(user)
        if (user) {
            const passwordControl = await authServices.compare(password, user.Password);
            if (!passwordControl) {
                res.status(401).json({
                    success: false,
                    message: `Wrong credentials`,
                });
            } else {
                // lisad jwt
                const token = await authServices.sign(user);
                res.status(200).json({
                    success: true,
                    message: 'token',
                    token,
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
