import z from "zod";
import {supplierSchema} from "@/utils/validation";

export const supplier = z.object({
    name: supplierSchema.shape.name,
    contactPerson: supplierSchema.shape.contactPerson,
    phone: supplierSchema.shape.phone,
    email: supplierSchema.shape.email,
    address: supplierSchema.shape.address,
});