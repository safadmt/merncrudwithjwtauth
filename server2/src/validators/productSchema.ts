import { z } from 'zod';

export const ProductSchema = z.object({
  product_name: z.string().min(1, "Product name is required"),
  description: z.string().optional(),
  price: z.coerce.number().positive("Price must be a positive number"),
  stock_available: z.coerce.number().int().nonnegative("Stock available must be a non-negative integer"),
  brand_id: z.coerce.number().int().positive("Brand ID must be a positive number"),
  category_id: z.coerce.number().int().positive("Category ID must be a positive number"),
  created_by: z.coerce.number().int().positive("Created by ID must be a positive number"),
  deleted: z.coerce.boolean()
});

