import { z } from 'zod';

const createUserValidationSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  photo: z.string().optional(),
});

const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    password: z.string().optional(),
    photo: z.string().optional(),
  }),
});

export const UserValidations = {
  createUserValidationSchema,
  updateUserValidationSchema,
};
