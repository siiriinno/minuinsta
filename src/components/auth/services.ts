import bcrypt from 'bcrypt';

const saltRounds = 10;

const authServices = {
    hash: async (password: string): Promise<string> => {
        return await bcrypt.hash(password, saltRounds);
    },
    compare: async (password: string, hashedPassword: string) : Promise<boolean> => {
        return await bcrypt.compare(password, hashedPassword);
    },
};

export default authServices;