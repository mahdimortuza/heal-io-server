import { z } from 'zod';

//  as vercel server dose not  allow to host files so, validation to create Category with image
// const createCategoryValidationSchema = z.object({
//   body: z.object({
//     category: z.object({
//       name: z.string(),
//       email: z.string().email(),
//       password: z.string(),
//       gender: z.enum(['superAdmin', 'admin', 'user']).optional(),
//       photo: z.string().optional(),
//     }),create-category
//   }),
// });

const createCategoryValidationSchema = z.object({
  body: z.object({
    name: z.enum(['primary', 'secondary', 'tertiary']),
    slug: z.string(),
    thumbnail: z.string().optional(),
  }),
});

const updateCategoryValidationSchema = z.object({
  body: z.object({
    name: z.enum(['primary', 'secondary', 'tertiary']).optional(),
    slug: z.string().optional(),
    thumbnail: z.string().optional(),
  }),
});

export const CategoryValidations = {
  createCategoryValidationSchema,
  updateCategoryValidationSchema,
};
