import Like from "./interfaces";



const likes: Like[] = [
    {
        userID: 1,
        id: 1,
        postID: 1,
        creationTime: "2022-09-25 21:10:22"
    }
]

const LikeService = {
    getLike: (likeid: number) => {
        const index = likes.findIndex((p) => p.id === likeid);
        if (index >= 0) {
            return likes[index]
        } else {
            return false
        }
    },
    deleteLike: (likeid: number) => {
        const index = likes.findIndex((p) => p.id === likeid);
        if (index >= 0) {
            likes.splice(index, 1);
            return true;
        } else {
            return false;
        }
    },
    addLike: (postid: number, userid: number, creationTime: string) => {
        const newID = likes.length+1;
        const newLike: Like = {
            creationTime,
            postID: postid,
            userID: userid,
            id: newID
        }
        likes.push(newLike);
        return true;
    }
}
export default LikeService;