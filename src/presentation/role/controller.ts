import { Request, Response } from "express"
import { AddRoleDto } from "../../domain/dtos/auth/addRole.dto";
import { IRoleService } from "../../infrastructure";
import { CustomError } from "../../domain";


export class RoleController {

    constructor(
        private readonly _roleServives: IRoleService
    ) {

    }

    private handleErrors(error: unknown, res: Response) {
        if (error instanceof CustomError) return res.status(error.statusCode).send({ error: error.message });

        if (error instanceof Error) return res.status(500).send({ error: error.message });
    }


    addRole = async (req: Request<{ id: string }, unknown, AddRoleDto>, res: Response) => {
        const { id } = req.params

        try {
            const result = await this._roleServives.addRole(id, req.body)
            res.json({ result })
        } catch (error) {
            this.handleErrors(error, res)
        }

    }
}