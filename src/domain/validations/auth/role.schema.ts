import { z } from "zod";

export const roleSchema = z.object({
    userId: z.string().uuid({ message: 'El userId no es válido' }).min(1, { message: 'El userId es requerido' }),
});