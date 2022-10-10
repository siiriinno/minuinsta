import {Request, Response} from "express";
import LikeService from "../likes/services";

const LikeController = {
    getLike: (req: Request, res: Response) => {
        const likeid = +req.params.id;
        const like = LikeService.getLike(likeid);
        if (like) {
            res.status(200).json(like);
        } else {
            res.status(404).json({
                message: "Laiki ei leitud"
            })
        }
    },
    deleteLike: (req: Request, res: Response) => {
        const likeid = +req.params.id;
        const result = LikeService.deleteLike(likeid);
        if (result) {
            res.status(200).json({
                message: "Laik on kustutatud"
            })
        } else {
            res.status(404).json({
                message: "Laiki ei leitud"
            })
        }
    },
    addLike: (req: Request, res: Response) => {
        const {postID, userID, creationTime} = req.body
        const status = LikeService.addLike(postID, userID, creationTime);
        if (status) {
            res.status(201).json({
                message: "Laik on lisatud"
            })
        } else {
            res.status(401).json({
                message: "Laiki ei saanud lisada"
            })
        }
    }
}

export default LikeController

