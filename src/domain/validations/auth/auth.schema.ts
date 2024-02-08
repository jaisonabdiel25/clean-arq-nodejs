import { z } from 'zod';

// Definir el esquema
export const authSchema = z.object({
  name: z.string().min(1,{ message: 'El nombre es requerido' }),
  email: z.string().email({ message: 'El correo electrónico no es válido' }),
  password: z.string().min(5,{ message: 'La constraseña debe tenner minimo 5 caracteres' }),
});
