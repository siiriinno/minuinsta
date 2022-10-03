import User from "./interfaces";

const users: User[] = [
    {
        name: "Mati",
        username: "Muru",
        id: 1,
        genderID: 2,
        bio: "blääblää",
    }
]

const UserService = {
    getUser: (id: number)=> {
        const index = users.findIndex((item) => item.id === id);
        if(index>=0) {
            return users[index]
        } else {
            return false
        }
    }
}

export default UserService;