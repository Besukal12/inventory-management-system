import z from 'zod';
import {categorySchema} from "@/utils/validation"

export const category = z.object({
  name: categorySchema.shape.name,
});