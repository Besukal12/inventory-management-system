import z from "zod";
import { inventoryTransactionSchema } from "@/utils/validation";

export const inventory = z.object({
  productId: inventoryTransactionSchema.shape.productId,
  type: inventoryTransactionSchema.shape.type,
  quantity: inventoryTransactionSchema.shape.quantity,
  note: inventoryTransactionSchema.shape.note,
});