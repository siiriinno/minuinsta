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
            message: `Kasutaja id-ga ${tmp.insertId} on loodud`,
        });
    },
    changeUser: async (req: Request, res: Response) => {
        const uid = parseInt(req.params.id);
        const {name, genderID, bio, email, password, profileImageUrl, website} = req.body;
        const result: any = await UserService.updateUser(uid, name, genderID, bio, email, password, profileImageUrl, website);
        if (result && result.affectedRows) {
            res.status(200).json({
                success: true,
                message: `Kasutaja id-ga ${uid} on uuendatud`,
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Kasutajat ei leitud",
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
        const user: User = await UserService.getUserbyUsername(username); //küsin kasutajanime järgi
        //console.log(user)
        if (user) { //tingimus, kui kasutaja leitakse
            const passwordControl = await authServices.compare(password, user.Password);//võrdlen sisestatud parooli hashitud parooliga
            if (!passwordControl) { //tõeväärtus, pole tõene
                res.status(401).json({
                    success: false,
                    message: `Wrong credentials`,
                });
            } else {
                // lisad jwt
                const token = await authServices.sign(user);//tõeväärtus, on tõene
                res.status(200).json({
                    success: true,
                    message: 'token',
                    uid: user.ID,
                    token,
                });
            }
        } else {
            res.status(401).json({
                success: false,
                message: `Wrong credentials`,
            });
        }
    },
    unFollowUser: async (req: Request, res: Response) => { //controller ei suhtle andmebaasiga
        const uid = parseInt(req.params.id); //üritab tekstist teha numbri
        const result = await UserService.unFollow(res.locals.user.id, uid); //annan service.ts-le kaasa sisselog. kasutaja id ja
                                                                            // tulevikus mittejälgitava kasutaja id
        if (!result) {
            res.status(404).json({ //töeväärtus, ei ole tõene
                success: false,
                message: `Jälgimist ei leitud`,
            });
        } else {
            res.status(200).json({ //tõeväärtus, on tõene
                success: true,
                message: `Jälgimine lõpetatud`,
            });
        }
    },
    followUser: async (req: Request, res: Response) => {
        const uid = parseInt(req.params.id);
        const result = await UserService.follow(res.locals.user.id, uid);

        if (!result) {
            res.status(404).json({
                success: false,
                message: `Jälgimist ei leitud`,
            });
        } else {
            res.status(201).json({
                success: true,
                message: `Jälgimine lisatud`,
            });
        }
    },
}
export default UserController;
