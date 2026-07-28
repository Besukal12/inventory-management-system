import { z } from "zod";
import { commonValidations } from "@/utils/validation";

export const registerSchema = z.object({
    name: z.string().min(1, "Name is required").max(50, "Name must be less than 50 characters"),
    email:  commonValidations.email,
    password: commonValidations.password,
    role: z.enum(["Admin", "Manager", "Employee"] as const, {
        message: "Role must be either 'Admin', 'Manager', or 'Employee'",
    }),
})

export const loginSchema = z.object({
    email: commonValidations.email,
    password: commonValidations.password,
})