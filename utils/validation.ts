import { z } from "zod";

export const commonValidations = {
  email: z
    .string()
    .min(1, "Email is required")
    .max(254, "Email must be no more than 254 characters")
    .email("Please provide a valid email address")
    .toLowerCase()
    .trim()
    .refine(
      (email) => {

        const suspiciousPatterns = [
          /<script/i,
          /javascript:/i,
          /on\w+\s*=/i,
          /data:/i,
        ];
        return !suspiciousPatterns.some(pattern => pattern.test(email));
      },
      "Email contains invalid characters"
    ),

  // Strong password validation
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(128, "Password must be no more than 128 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .refine(
      (password) => {
        // Check for common weak passwords
        const commonPasswords = [
          "password", "123456", "qwerty", "abc123", "password123",
          "admin", "letmein", "welcome", "monkey", "dragon"
        ];
        return !commonPasswords.includes(password.toLowerCase());
      },
      "Password is too common, please choose a stronger password"
    ),
}