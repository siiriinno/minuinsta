import User from "./interfaces";

const users: User[] = [
    {
        name: "Mati",
        username: "Muru",
        id: 1,
        genderID: 2,
        bio: "blääblää",
        password: "gxfgdfgfg"
    }
]

const UserService = {
    getUser: (id: number) => {
        const index = users.findIndex((item) => item.id === id);
        if (index >= 0) {
            return users[index]
        } else {
            return false
        }
    },
    getUserbyUsername: (username: string) => {
        const index = users.findIndex((item) => item.username === username);
        if (index >= 0) {
            return users[index]
        }
    },
    addUser: (newUser: User) => {
        newUser.id = users.length + 1;
        users.push(newUser);
        return newUser.id;
    },
    deleteUser: (uid: number) => {
        const index = users.findIndex((u) => u.id === uid);
        if (index >= 0) {
            users.splice(index, 1);
            return true;
        } else {
            return false
        }
    },
    updateUser: (uid: number, name: string, genderID: string, bio: string, email: string, password: string, profileImageUrl: string, website: string) =>{
        const index = users.findIndex((u) => u.id === uid);
        if (index < 0) {
           return false
        } else {
            if (name) {
                users[index].name = name;
            }
            if (genderID) {
                users[index].genderID = parseInt(genderID);
            }
            if (email) {
                users[index].email = email;
            }
            if (password) {
                users[index].password = password;
            }
            if (profileImageUrl) {
                users[index].profileImageUrl = profileImageUrl;
            }
            if (website) {
                users[index].website = website;
            }
            if (bio) {
                users[index].bio = bio;
            }
            return true;
        }
}
}

export default UserService;