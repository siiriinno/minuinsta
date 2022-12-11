import DB from "../../database";

const PostService = {
    getPost: async (postid: number) => {
        const posts = await DB.query("select * from Insta_Post where ID=?", [postid])
        //const index = posts.findIndex((p) => p.id === postid);
        if (posts) {
            return posts[0]
        } else {
            return false
        }
    },
    deletePost: async (postid: number) => {
        const result = await DB.query("delete from Insta_Post where ID=?", [postid])
        return result.affectedRows !== 0;
        /*const index = posts.findIndex((p) => p.id === postid);
        if (index >= 0) {
            posts.splice(index, 1);
            return true;
        } else {
            return false;
        }*/
    },
    addPost: async (userid: number, title: string, content: string) => {
        //const newID = posts.length+1;
        /*const newPost: Post = {
            locationName,
            userID: userid,
            id: newID
        }
        posts.push(newPost);
        return true;*/
        return await DB.query(
            "insert into Insta_Post (userid, Title, Content) values(?,?,?)",
            [userid, title, content]
        )
    },
    getLatest: async (userid: number) => {
        const posts = await DB.query(`call getLatest(?)`, [userid])
        if (posts) {
            return posts[0]
        } else {
            return false
        }
    }
}

export default PostService
