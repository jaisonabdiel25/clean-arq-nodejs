import jwt from 'jsonwebtoken';
import { envs } from './envs';


const JWT_SEED = envs.JWT_SECRET;

export class jwtAdapter {


    static async generateToken(payload: object, duration = '2h'): Promise<string | null> {
        return new Promise((resolve) => {
            jwt.sign(payload, JWT_SEED, { expiresIn: duration }, (err, token) => {
                if (err) throw err;
                resolve(token!);
            });
        })
    }

    static async verifyToken<T>(token: string): Promise<T | null> {
        return new Promise((resolve) => {
            jwt.verify(token, JWT_SEED, (err, decoded) => {
                if (err) return resolve(null);
                resolve(decoded as T);
            });
        })
    }
}
