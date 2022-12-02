import bcrypt from 'bcrypt'; //parooli krüpteerimine ja kontroll
import User from "../users/interfaces";
import jwt from 'jsonwebtoken'; //tokeni tegemine, kontrollimine jne
import config from '../../apiConfig';

const { saltRounds, jwtSecret } = config;

const authServices = {
    hash: async (password: string): Promise<string> => { //parooli hash
        return await bcrypt.hash(password, saltRounds); //bcrypt teeb hashi
    },
    compare: async (password: string, hashedPassword: string) : Promise<boolean> => { //tõeväärtus, võrdleb andmebaasi hashitud parooli sisestatud parooliga
        return await bcrypt.compare(password, hashedPassword); // tagastab väärtuse, kas on korras või ei ole
    },
    sign: async (user: User) : Promise<string> => { //tokeni tegemine
        const payload = {
            id: user.ID,
            username: user.Username,
            role: user.Role,
        };
        return jwt.sign(payload, jwtSecret, {expiresIn: '2h'}); //tagastab tokeni, lisab kehtivusaja
    },
    verify: async (token: string) => { //kontrollib, kas talle antud token kehtib
        const decoded = await jwt.verify(token, jwtSecret);
        return decoded;
    }
};

export default authServices;
