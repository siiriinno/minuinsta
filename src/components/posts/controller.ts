import {Request, Response} from "express";
import PostService from "../posts/services";

const PostController = {
    getPost: async (req: Request, res: Response) => {
        const postid = +req.params.id;
        const post = await PostService.getPost(postid);
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({
                message: "Postitust ei leitud"
            })
        }
    },
    deletePost: async (req: Request, res: Response) => {
        const postid = +req.params.id;
        const result = await PostService.deletePost(postid);
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
    addPost: async (req: Request, res: Response) => {
        const {title, content} = req.body
        const status = await PostService.addPost(res.locals.user.id, title, content);

        if (status.affectedRows === 1) {
            res.status(201).json({
                success: true,
                message: `Postitus koos id ${status.insertId} on lisatud`,
            });

        } else {
            res.status(404).json({
                message: "Postitust ei saanud lisada"
            })
        }
    },
    getLatest: async (req: Request, res: Response) => {
       const posts = await PostService.getLatest(res.locals.user.id); //
        if (posts) {
            res.status(200).json(posts);
        } else {
            res.status(404).json({
                message: "Postitusi ei leitud"
            })
        }
    },
}

export default PostController
