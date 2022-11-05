import {Request, Response} from "express";
import LikeService from "../likes/services";

const LikeController = {
    getLike: async (req: Request, res: Response) => {
        const postid = +req.params.id;
        const like = await LikeService.getLike(postid);
        res.status(200).json(like);
    },
    deleteLike: async (req: Request, res: Response) => {
        const postid = +req.params.id;
        const result = await LikeService.deleteLike(postid, res.locals.user.id);
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
    addLike: async (req: Request, res: Response) => {
        //const {postID, userID} = req.body
        const postID = +req.params.id;
        const status = await LikeService.addLike(postID, res.locals.user.id);
        if (status.affectedRows === 1) {
            res.status(201).json({
                success: true,
                message: `Laik on lisatud`,
            });

        } else {
            res.status(404).json({
                message: "Laiki ei saanud lisada"
            })
        }
    }
}

export default LikeController

