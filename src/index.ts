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

//todo kasutaja lisamine

app.listen(3000, () => {
    console.log("Server töötab");
});