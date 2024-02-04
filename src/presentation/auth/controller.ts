import { Request, Response } from "express"
import { RegisterUserDto } from '../../domain/dtos/auth/registerUser.dto';
import { AuthService, CustomError } from "../../domain";
import { jwtAdapter } from "../../config";
import { UserDB } from "../../data/mongoose";

export class AuthController {

    constructor(
        private readonly _authServives: AuthService
    ) {

    }

    private handleErrors(error: unknown, res: Response) {
        if (error instanceof CustomError) return res.status(error.statusCode).send({ error: error.message });

        if (error instanceof Error) return res.status(500).send({ error: error.message });
    }

    registerUser = async (req: Request, res: Response) => {

        try {
            const [error, registerUserDto] = await RegisterUserDto.RegisterUser(req.body)

            if (error) return res.status(412).send({ error });

            const result = await this._authServives.register(registerUserDto!)

            res.json({ result, token: await jwtAdapter.generateToken({ id: result.id }) })
        } catch (error) {
            this.handleErrors(error, res)
        }

    }

    loginUser = (req: Request, res: Response) => {
        res.send(req.body)
    }

    getUsers = async (req: Request, res: Response) => {
        const userDB = await UserDB.find()

        res.json({ user: userDB, token: req.body.token })
    }
}