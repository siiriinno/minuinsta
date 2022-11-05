import DB from "../../database";

const LikeService = {
    getLike: async (postid: number) => {
        const likes = await DB.query("select count(UserID) as likes from Insta_Liking where PostID=?", [postid])
        //const index = likes.findIndex((p) => p.id === likeid);
        if (likes) {
            return likes[0]['likes']
        } else {
            return 0
        }
    },
    deleteLike: async (postid: number, userid: number) => {
        const result = await DB.query("delete from Insta_Liking where PostID=? and UserId=?", [postid, userid])
        return result.affectedRows !== 0;

        //const index = likes.findIndex((p) => p.id === likeid);
        /*if (index >= 0) {
            likes.splice(index, 1);
            return true;
        } else {
            return false;
        }*/
    },
    addLike: async (postid: number, userid: number) => {
        return await DB.query(
            "insert into Insta_Liking (PostID, UserID) values(?,?)",
            [
                postid, userid
            ]
        )
        /*const newID = likes.length+1;
        const newLike: Like = {
            creationTime,
            postID: postid,
            userID: userid,
            id: newID
        }*/
        //likes.push(newLike);
        //return true;
    }
}
export default LikeService;
