import { z } from 'zod';

export const createProductValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Name must be a string',
    }),
    slug: z.string({
      invalid_type_error: 'Slug must be a string',
    }),
    photos: z
      .string({
        invalid_type_error: 'Photos must be an array of non-empty strings',
      })
      .array()
      .min(1, {
        message: 'At least one photo is required',
      }),
    description: z.string({
      invalid_type_error: 'Description must be a string',
    }),
    metaKey: z.string({
      invalid_type_error: 'MetaKey must be a string',
    }),
    price: z
      .number({
        invalid_type_error: 'Price must be a number',
      })
      .positive('Price must be a positive number'),
    discount: z
      .number({
        invalid_type_error: 'Discount must be a number',
      })
      .min(0, 'Discount must be at least 0')
      .max(1, 'Discount must be at most 1'),
    stockStatus: z.boolean({
      invalid_type_error: 'Stock status must be a boolean',
    }),
    variant: z.string({ invalid_type_error: 'Variant is required' }),
    category: z.string({ invalid_type_error: 'Category is required' }),
  }),
});

const updateProductValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Name must be a string',
      })
      .optional(),
    slug: z
      .string({
        invalid_type_error: 'Slug must be a string',
      })
      .optional(),
    photos: z
      .string({
        invalid_type_error: 'Photos must be an array of non-empty strings',
      })
      .array()
      .min(1, {
        message: 'At least one photo is required',
      })
      .optional(),
    description: z
      .string({
        invalid_type_error: 'Description must be a string',
      })
      .optional(),
    metaKey: z
      .string({
        invalid_type_error: 'MetaKey must be a string',
      })
      .optional(),
    price: z
      .number({
        invalid_type_error: 'Price must be a number',
      })
      .positive('Price must be a positive number'),
    discount: z
      .number({
        invalid_type_error: 'Discount must be a number',
      })
      .min(0, 'Discount must be at least 0')
      .max(1, 'Discount must be at most 1'),
    stockStatus: z
      .boolean({
        invalid_type_error: 'Stock status must be a boolean',
      })
      .optional(),
    variant: z.string({ invalid_type_error: 'Variant is required' }).optional(),
    category: z
      .string({ invalid_type_error: 'Category is required' })
      .optional(),
  }),
});

export const ProductValidations = {
  createProductValidationSchema,
  updateProductValidationSchema,
};
