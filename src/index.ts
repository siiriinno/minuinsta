import express, {Request, Response} from "express"

const app = express();
app.use(express.json());

interface User {
    name: string;
    username: string;
    id: number;
    website?: string;
    genderID: number;
    bio: string;
    email?: string;
    creationTime?: string;
    password?: string;
    profileImageUrl?: string;
}

const users: User[] = [
    {
        name: "Mati",
        username: "Muru",
        id: 1,
        genderID: 2,
        bio: "blääblää",
    }
]

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Tere tali"
    })
});

app.get("/users/:id", (req: Request, res: Response) => {
    const userid = +req.params.id;
    const index = users.findIndex((item) => item.id === userid);
    if (index < 0) {
        res.status(404).json({
            message: "Kasutajat ei leitud"
        })
    } else {
        res.status(200).json(users[index])
    }
})

app.post("/users", (req: Request, res: Response) => {
    const {name, username, genderID, bio} = req.body;
    const id = users.length + 1;
    if (name && username && genderID && bio) {
        const newUser: User = {
            id,
            name,
            username,
            genderID,
            bio,
        };
        users.push(newUser);

        res.status(201).json({
            success: true,
            message: `User with id ${newUser.id} created`,
        });
    } else {
        res.status(400).json({
            success: false,
            message: `Invalid request`,
        });
    }
});

app.put("/users/:id", (req: Request, res: Response) => {
    const uid = parseInt(req.params.id);
    const index = users.findIndex((u) => u.id === uid);
    if (index < 0) {
        res.status(404).json({
            success: false,
            message: "User not found",
        });
    } else {
        const {name, genderID, bio, email, password, profileImageUrl, website } = req.body;
        if (name) {
            users[index].name = name;
        }
        if (genderID) {
            users[index].genderID = genderID;
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
        res.status(200).json({
            success: true,
            message: `User with id ${uid} updated`,
        });
    }
});

app.delete("/users/:id", (req: Request, res: Response) => {
    const uid = parseInt(req.params.id);
    const index = users.findIndex((u) => u.id === uid);
    if (index < 0) {
        res.status(404).json({
            success: false,
            message: `User not found`,
        });
    } else {
        users.splice(index, 1);
        res.status(201).json({
            success: true,
            message: `User deleted`,
        });
    }
});


app.listen(3000, () => {
    console.log("Server töötab");
});