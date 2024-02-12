import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";
import { CustomError } from "../../domain";

export const schemaValidations =
    (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(412).json(error.errors.map(issues => issues.message))
            }
            throw CustomError.internal();
        }
    }