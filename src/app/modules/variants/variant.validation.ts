import { z } from 'zod';

const createVariantValidationSchema = z.object({
  body: z.object({
    variant: z.enum(['500', '1000']),
  }),
});

const updateVariantValidationSchema = z.object({
  body: z.object({
    name: z.enum(['500', '1000']).optional(),
  }),
});

export const VariantValidations = {
  createVariantValidationSchema,
  updateVariantValidationSchema,
};
