import Post from "./interfaces";

const posts: Post[] = [
    {
        userID: 1,
        id: 1,
        locationName: "Haapsalu",
        creationTime: "2022-09-25 21:10:22"
    }
]

const PostService = {
    getPost: (postid: number) => {
        const index = posts.findIndex((p) => p.id === postid);
        if (index >= 0) {
            return posts[index]
        } else {
            return false
        }
    },
    deletePost: (postid: number) => {
        const index = posts.findIndex((p) => p.id === postid);
        if (index >= 0) {
            posts.splice(index, 1);
            return true;
        } else {
            return false;
        }
    },
    addPost: (userid: number, locationName: string) => {
        const newID = posts.length+1;
        const newPost: Post = {
            locationName,
            userID: userid,
            id: newID
        }
        posts.push(newPost);
        return true;
    }
}

export default PostService