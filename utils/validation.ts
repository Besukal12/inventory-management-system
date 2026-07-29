import { z } from "zod";

const sanitizeString = (val: string) => {
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /data:/i,
    /UNION\s+SELECT/i,
    /DROP\s+TABLE/i,
    /DELETE\s+FROM/i,
  ];
  return !suspiciousPatterns.some((pattern) => pattern.test(val));
};

const sanitizedString = (name: string, maxLen = 255) =>
  z
    .string()
    .min(1, `${name} is required`)
    .max(maxLen, `${name} must be less than ${maxLen} characters`)
    .trim()
    .refine(
      sanitizeString,
      `${name} contains invalid characters or security risks`,
    );

export const commonValidations = {
  email: z
    .string()
    .min(1, "Email is required")
    .max(254, "Email must be no more than 254 characters")
    .email("Please provide a valid email address")
    .toLowerCase()
    .trim()
    .refine(sanitizeString, "Email contains invalid characters"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(128, "Password must be no more than 128 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    )
    .refine((password) => {
      const commonPasswords = [
        "password",
        "123456",
        "qwerty",
        "abc123",
        "password123",
        "admin",
        "letmein",
        "welcome",
        "monkey",
        "dragon",
      ];
      return !commonPasswords.includes(password.toLowerCase());
    }, "Password is too common, please choose a stronger password"),
};

export const categorySchema = z.object({
  name: sanitizedString("Category name", 100),
});

export const supplierSchema = z.object({
  name: sanitizedString("Supplier name", 150),
  contactPerson: sanitizedString("Contact person name", 100),
  phone: z
    .string()
    .trim()
    .regex(
      /^\+?[1-9]\d{1,14}$/,
      "Please enter a valid international phone number",
    ),
  email: commonValidations.email,
  address: sanitizedString("Address", 500),
});

export const productSchema = z.object({
  name: sanitizedString("Product name", 150),
  sku: z
    .string()
    .trim()
    .toUpperCase()
    .min(3, "SKU must be at least 3 characters")
    .max(50, "SKU must be no more than 50 characters")
    .regex(
      /^[A-Z0-9_-]+$/,
      "SKU can only contain alphanumeric characters, hyphens, and underscores",
    ),
  price: z
    .number({
      message: "Price must be a number",
    })
    .positive("Price must be greater than 0")
    .max(99999999.99, "Price exceeds allowable limit"),
  quantity: z
    .number()
    .int("Quantity must be an integer")
    .min(0, "Quantity cannot be negative")
    .default(0),
  lowStockAt: z
    .number()
    .int("Low stock alert threshold must be an integer")
    .min(0, "Low stock alert threshold cannot be negative")
    .default(5),
  categoryId: z.string().cuid("Invalid Category ID"),
  supplierId: z.string().cuid("Invalid Supplier ID"),
  isActive: z.boolean().default(true),
});

export const transactionTypeEnum = z.enum(["STOCK_IN", "STOCK_OUT"], {
  message: "Invalid transaction type",
});

export const inventoryTransactionSchema = z.object({
  productId: z.string().cuid("Invalid Product ID"),
  type: transactionTypeEnum,
  quantity: z
    .number()
    .int("Quantity must be an integer")
    .positive("Transaction quantity must be a positive integer"),
  note: z
    .string()
    .trim()
    .max(500, "Note must be under 500 characters")
    .refine(sanitizeString, "Note contains invalid characters")
    .optional(),
});

export const settingsSchema = z.object({
  businessName: sanitizedString("Business name", 150),
  currency: z
    .string()
    .trim()
    .toUpperCase()
    .length(3, "Currency must be a 3-letter ISO code (e.g. USD, EUR)"),
  theme: z.enum(["light", "dark", "system"]).default("light"),
});

export type CategoryInput = z.infer<typeof categorySchema>;
export type SupplierInput = z.infer<typeof supplierSchema>;
export type ProductInput = z.infer<typeof productSchema>;
export type InventoryTransactionInput = z.infer<
  typeof inventoryTransactionSchema
>;
export type SettingsInput = z.infer<typeof settingsSchema>;
