import {NextFunction, Request, Response} from "express";

const UserMiddleware = {

    checkNewUserData: (req: Request, res: Response, next: NextFunction) => {
        const {name, username, genderID, bio} = req.body;
        if (name && username && genderID && bio) {
            next();
        } else {
            res.status(401).json({status: false, message: "invalid data"})
        }
    },
    checkUpdateUserData: (req: Request, res: Response, next: NextFunction) => {
        const {name, genderID, bio, email, password, profileImageUrl, website} = req.body;
        if (name || genderID || bio || email || password || profileImageUrl || website) {
            next();
        } else {
            res.status(401).json({status: false, message: "invalid data"})
        }
    }
}

export default UserMiddleware;