import z from "zod";
import { productSchema } from "@/utils/validation";

export const product = z.object({
  name: productSchema.shape.name,
  sku: productSchema.shape.sku,
  price: z.number().min(0, "Price must be a positive number"),
  quantity: z
    .number()
    .int("Quantity must be an integer")
    .min(0, "Quantity cannot be negative"),
  lowStockAt: z
    .number()
    .int("Low stock alert threshold must be an integer")
    .min(0, "Low stock alert threshold cannot be negative")
    .optional(),
  categoryId: productSchema.shape.categoryId,
  supplierId: productSchema.shape.supplierId,
  isActive: productSchema.shape.isActive,
});
