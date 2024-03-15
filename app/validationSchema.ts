import { z } from "zod";

export const productSchema = z.object({
  name: z.string()
    .min(1, 'Name is required.')
    .max(255),
  description: z.string()
    .min(1, 'Description is required'),
  category: z.number()
    .min(1, 'Category is required'),
  price: z.string()
    .min(1, 'Price is required'),
  quantity: z.string()
    .min(1, 'Quantity is required'),
  supplier_id: z.string()
    .optional()
});

export const supplierSchema = z.object({
  name: z.string()
    .min(1, 'Name is required.')
    .max(255),
  email: z.string()
    .min(1, 'Email is required')
    .email(),
  phone: z.string()
    .min(1, 'Phone is required')
});
