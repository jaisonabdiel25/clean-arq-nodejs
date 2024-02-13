import { z } from "zod";

export const registerAccountSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    amount: z.number().min(1, { message: 'El monto debe ser mayor a 0' }),
    balance: z.number().nonnegative().optional(),
    userId: z.string().uuid({ message: 'El userId no es válido' }).min(1, { message: 'El userId es requerido' }),
});