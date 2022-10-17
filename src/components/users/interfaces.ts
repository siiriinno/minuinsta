interface User {
    name: string;
    username: string;
    id?: number;
    website?: string;
    genderID: number;
    bio: string;
    email?: string;
    creationTime?: string;
    password: string;
    profileImageUrl?: string;
}

export default User;