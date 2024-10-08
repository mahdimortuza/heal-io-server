import { z } from 'zod';

//  as vercel server dose not  allow to host files so, validation to create user with image
// const createUserValidationSchema = z.object({
//   body: z.object({
//     user: z.object({
//       name: z.string(),
//       email: z.string().email(),
//       password: z.string(),
//       gender: z.enum(['superAdmin', 'admin', 'user']).optional(),
//       photo: z.string().optional(),
//     }),
//   }),
// });

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    gender: z.enum(['superAdmin', 'admin', 'user']).optional(),
    photo: z.string().optional(),
  }),
});

const updateUserValidationSchema = z.object({
  body: z.object({
    body: z.object({
      name: z.string().optional(),
      email: z.string().optional(),
      password: z.string().optional(),
      photo: z.string().optional(),
    }),
  }),
});

export const UserValidations = {
  createUserValidationSchema,
  updateUserValidationSchema,
};
