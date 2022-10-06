import {Request, Response} from "express";
import PostService from "../posts/services";

const PostController = {
    getPost: (req: Request, res: Response) => {
        const postid = +req.params.id;
        const post = PostService.getPost(postid);
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({
                message: "Postitust ei leitud"
            })
        }
    },
    deletePost: (req: Request, res: Response) => {
        const postid = +req.params.id;
        const result = PostService.deletePost(postid);
        if (result) {
            res.status(200).json({
                message: "Postitus on kustutatud"
            })
        } else {
            res.status(404).json({
                message: "Postitust ei leitud"
            })
        }
    },
    addPost: (req: Request, res: Response) => {
        const {userID, locationName} = req.body
        const status = PostService.addPost(userID, locationName);
        if (status) {
            res.status(201).json({
                message: "Postitus on lisatud"
            })
        } else {
            res.status(404).json({
                message: "Postitust ei saanud lisada"
            })
        }
    }
}

export default PostController