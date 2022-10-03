import e, {Request, Response} from "express";
import User from "./interfaces";
import UserService from "./services";

const users: User[] = [
    {
        name: "Mati",
        username: "Muru",
        id: 1,
        genderID: 2,
        bio: "blääblää",
    }
]

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

        /*const index = users.findIndex((item) => item.id === userid);
        if (index < 0) {
            res.status(404).json({
                message: "Kasutajat ei leitud"
            })
        } else {
            res.status(200).json(users[index])
        }*/
    },

    addUser: (req: Request, res: Response) => {
        const {name, username, genderID, bio} = req.body;
        const id = users.length + 1;
        if (name && username && genderID && bio) {
            const newUser: User = {
                id,
                name,
                username,
                genderID,
                bio,
            };
            users.push(newUser);

            res.status(201).json({
                success: true,
                message: `User with id ${newUser.id} created`,
            });
        } else {
            res.status(400).json({
                success: false,
                message: `Invalid request`,
            });
        }
    },
    changeUser: (req: Request, res: Response) => {
        const uid = parseInt(req.params.id);
        const index = users.findIndex((u) => u.id === uid);
        if (index < 0) {
            res.status(404).json({
                success: false,
                message: "User not found",
            });
        } else {
            const {name, genderID, bio, email, password, profileImageUrl, website } = req.body;
            if (name) {
                users[index].name = name;
            }
            if (genderID) {
                users[index].genderID = genderID;
            }
            if (email) {
                users[index].email = email;
            }
            if (password) {
                users[index].password = password;
            }
            if (profileImageUrl) {
                users[index].profileImageUrl = profileImageUrl;
            }
            if (website) {
                users[index].website = website;
            }
            if (bio) {
                users[index].bio = bio;
            }
            res.status(200).json({
                success: true,
                message: `User with id ${uid} updated`,
            });
        }
    },
    deleteUser: (req: Request, res: Response) => {
        const uid = parseInt(req.params.id);
        const index = users.findIndex((u) => u.id === uid);
        if (index < 0) {
            res.status(404).json({
                success: false,
                message: `User not found`,
            });
        } else {
            users.splice(index, 1);
            res.status(201).json({
                success: true,
                message: `User deleted`,
            });
        }
    },
}
export default UserController;