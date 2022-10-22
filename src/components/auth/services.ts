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
            id: user.id,
            email: user.email,
            //role: user.role,
        };
        return await jwt.sign(payload, jwtSecret, {expiresIn: '2h'});
    },
    verify: async (token: string) => {
        const decoded = await jwt.verify(token, jwtSecret);
        return decoded;
    }
};

export default authServices;
