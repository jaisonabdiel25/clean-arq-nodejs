import { Request, Response } from "express"
import { CustomError, LoginUserDto, RegisterUserDto } from "../../domain";
import { jwtAdapter } from "../../config";
import { UserDB } from "../../data/mongoose";
import { AddRoleDto } from "../../domain/dtos/auth/addRole.dto";
import { IAuthService } from "../../infrastructure";


export class AuthController {

    constructor(
        private readonly _authServives: IAuthService
    ) {

    }

    private handleErrors(error: unknown, res: Response) {
        if (error instanceof CustomError) return res.status(error.statusCode).send({ error: error.message });

        if (error instanceof Error) return res.status(500).send({ error: error.message });
    }

    registerUser = async (req: Request, res: Response) => {
        try {
            const [error, registerUserDto] = await RegisterUserDto.RegisterUser(req.body)

            if (error.length > 0) return res.status(412).send({ error });

            const result = await this._authServives.register(registerUserDto!)

            res.json({ result, token: await jwtAdapter.generateToken({ id: result.id }) })
        } catch (error) {
            this.handleErrors(error, res)
        }
    }

    loginUser = async (req: Request, res: Response) => {
        try {
            const [error, loginUserDto] = await LoginUserDto.loginUser(req.body);

            if (error.length > 0) return res.status(412).send({ error });

            const result = await this._authServives.login(loginUserDto!);
            res.json({ result, token: await jwtAdapter.generateToken({ id: result.id }) });
        } catch (error) {
            this.handleErrors(error, res)
        }
    }

    generateToken = async (req: Request, res: Response) => {
        try {

            res.json({ token: await jwtAdapter.generateToken({}) })
        } catch (error) {
            this.handleErrors(error, res)
        }
    }

    getUsers = async (req: Request, res: Response) => {
        const userDB = await UserDB.find()

        res.json({ user: userDB, token: req.body.token })
    }
}