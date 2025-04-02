import { z } from "zod"

// Base schema for common fields
const baseAuthSchema = {
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least one number",
    }),
}

// Sign-in schema
export const signInSchema = z.object({
  email: baseAuthSchema.email,
  password: baseAuthSchema.password,
})

// Sign-up schema with additional fields
export const signUpSchema = z
  .object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters long",
    }),
    email: baseAuthSchema.email,
    password: baseAuthSchema.password,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

// Type definitions
export type SignInFormValues = z.infer<typeof signInSchema>
export type SignUpFormValues = z.infer<typeof signUpSchema>

