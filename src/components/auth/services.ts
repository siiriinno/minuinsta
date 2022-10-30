import bcrypt from 'bcrypt';
import User from "../users/interfaces";
import jwt from 'jsonwebtoken';
import config from '../../apiConfig';
const { saltRounds, jwtSecret } = config;


const authServices = {
    hash: async (password: string): Promise<string> => {
        return await bcrypt.hash(password, saltRounds);
    },
    compare: async (password: string, hashedPassword: string) : Promise<boolean> => {
        return await bcrypt.compare(password, hashedPassword);
    },
    sign: async (user: User) : Promise<string> => {
        const payload = {
            id: user.ID,
            username: user.Username,
            role: user.Role,
        };
        return jwt.sign(payload, jwtSecret, {expiresIn: '2h'});
    },
    verify: async (token: string) => {
        const decoded = await jwt.verify(token, jwtSecret);
        return decoded;
    }
};

export default authServices;
