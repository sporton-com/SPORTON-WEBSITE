import { z } from "zod";

export const productSchema = z.object({
    name: z.string().min(1, "Name is required"),
    price: z.number().positive("Price must be a positive number"),
    condition: z.string().min(1, "Condition is required"),
    description: z.string().optional(),
    images: z.array(z.string()).min(1, "At least one image is required"), // Store base64 encoded image strings
  });
  
 export type ProductFormData = z.infer<typeof productSchema>;
