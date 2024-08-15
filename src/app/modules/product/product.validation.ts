import { z } from 'zod';

const detailSchema = z.object({
  photo: z.string({ invalid_type_error: 'Photo is required' }),
  variant: z.string({ invalid_type_error: 'Variant is required' }),
  price: z.string({ invalid_type_error: 'Price is required' }),
});

export const createProductValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Name must be a string',
    }),
    slug: z.string({
      invalid_type_error: 'Slug must be a string',
    }),

    description: z.string({
      invalid_type_error: 'Description must be a string',
    }),
    metaKey: z.string({
      invalid_type_error: 'MetaKey must be a string',
    }),

    discount: z
      .number({
        invalid_type_error: 'Discount must be a number',
      })
      .min(0, 'Discount must be at least 0')
      .max(1, 'Discount must be at most 1'),
    stockStatus: z.boolean({
      invalid_type_error: 'Stock status must be a boolean',
    }),
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
    ProductDetail: z.array(detailSchema),
    category: z
      .string({ invalid_type_error: 'Category is required' })
      .optional(),
  }),
});

export const ProductValidations = {
  createProductValidationSchema,
  updateProductValidationSchema,
};
