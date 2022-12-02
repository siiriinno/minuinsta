import { Request, Response, NextFunction } from 'express';
import authServices from './services';
//middleware ülesandeks on kontrollida andmete tingimusi
const authMiddleware = {
    isLoggedIn: async (req: Request, res: Response, next: NextFunction) => { //kontrollib tokenit
        const token = req.headers.authorization?.split(' ')[1]; //kas token on olemas?
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token not found',
            });
        }
        try {
            const decoded = await authServices.verify(token); //küsib, kas token kehtib
            res.locals.user = decoded; //loeb tokeni seest kasutajaandmed välja
        } catch (error) { //kui tokenis on viga/ei saa kontrollida, siis tagastab, et token ei kehti
            return res.status(401).json({
                success: false,
                message: 'Token is not valid',
            });
        }
        return next();
    },
    isAdmin: (req: Request, res: Response, next: NextFunction) => { // küsib, kas on admin
        if (res.locals.user.role !== 1) {
            return res.status(401).json({
                success: false,
                message: 'You have to be admin',
            });
        }
        return next();
    },
};

export default authMiddleware;
