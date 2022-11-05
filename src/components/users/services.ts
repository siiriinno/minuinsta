import User from "./interfaces";
import DB from "../../database";

const UserService = {
    getUser: async (id: number) => {
        const users = await DB.query("select * from Insta_User where ID=?", [id])
        //const index = users.findIndex((item) => item.id === id);
        //if (index >= 0) {
        if (users) {
            return users[0]
        } else {
            return false
        }
    },
    getUserbyUsername: async (username: string) => {
        const users = await DB.query("select * from Insta_User where Username=?", [username])
        if (users) {
            return users[0]
        }
        //const index = users.findIndex((item) => item.username === username);
        //if (index >= 0) {
        //    return users[index]
        //}
    },
    addUser: async (newUser: User) => {
        //newUser.id = users.length + 1;
        //users.push(newUser);
        const result = await DB.query(
            "insert into Insta_User (Username, Name, GenderID, Bio, Password, Role) values(?,?,?,?,?,?)",
            [
                newUser.Username,
                newUser.Name,
                newUser.GenderID,
                newUser.Bio,
                newUser.Password,
                newUser.Role
            ]
        )
        return result
        //return newUser.id;
    },
    deleteUser: async (uid: number) => {
        const result = await DB.query("delete from Insta_User where ID=?", [uid])
        return result.affectedRows !== 0;
        //const index = users.findIndex((u) => u.id === uid);
        // if (index >= 0) {
        //     users.splice(index, 1);
        //     return true;
        // } else {
        //     return false
        // }

    },
    updateUser: async (uid: number, name: string, genderID: string, bio: string, email: string, password: string, profileImageUrl: string, website: string) => {
        let user = false
        if (name) {
            user = await DB.query("update Insta_User set Name=? where ID=?", [name, uid])
        }
        if (genderID) {
            user = await DB.query("update Insta_User set GenderID=? where ID=?", [genderID, uid])
        }
        if (email) {
            user = await DB.query("update Insta_User set Email=? where ID=?", [email, uid])
        }
        if (password) {
            user = await DB.query("update Insta_User set Password=? where ID=?", [password, uid])
        }
        if (profileImageUrl) {
            user = await DB.query("update Insta_User set ProgileImageUrl=? where ID=?", [profileImageUrl, uid])
        }
        if (website) {
            user = await DB.query("update Insta_User set Website=? where ID=?", [website, uid])
        }
        if (bio) {
            user = await DB.query("update Insta_User set Bio=? where ID=?", [bio, uid])
        }
        return user;
    }
}

export default UserService;
