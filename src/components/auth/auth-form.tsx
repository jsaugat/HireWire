/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, signUpSchema, type SignInFormValues, type SignUpFormValues } from "@/lib/auth-schema"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { FormField } from "@/components/form-field"

interface AuthFormProps {
  type: "signin" | "signup"
  onSubmit: (values: SignInFormValues | SignUpFormValues) => void
  isLoading?: boolean
}

export function AuthForm({ type, onSubmit, isLoading = false }: AuthFormProps) {
  const isSignIn = type === "signin"
  const title = isSignIn ? "Sign In" : "Create an Account"
  const description = isSignIn
    ? "Enter your credentials to access your account"
    : "Fill in your details to create a new account"
  const submitText = isSignIn ? "Sign In" : "Sign Up"
  const footerText = isSignIn ? "Don't have an account?" : "Already have an account?"
  const footerLinkText = isSignIn ? "Create an account" : "Sign in"
  const footerLink = isSignIn ? "/signup" : "/signin"

  // Use the appropriate schema based on form type
  const schema = isSignIn ? signInSchema : signUpSchema

  // Initialize form with the correct type
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: isSignIn ? { email: "", password: "" } : { name: "", email: "", password: "", confirmPassword: "" },
    mode: "onChange", // Enable form validation on change
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form

  const onFormSubmit = (values: any) => {
    onSubmit(values)
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg bg-transparent backdrop-blur-xs">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">{title}</CardTitle>
        <CardDescription className="text-center">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          {!isSignIn && (
            <FormField
              name="name"
              label="Name"
              placeholder="Enter your name"
              register={register}
              error={errors.name?.message as string}
            />
          )}

          <FormField
            name="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            register={register}
            error={errors.email?.message as string}
          />

          <FormField
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            register={register}
            error={errors.password?.message as string}
          />

          {!isSignIn && (
            <FormField
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              register={register}
              error={errors.confirmPassword?.message as string}
            />
          )}

          <Button type="submit" className="w-full mt-6" disabled={isLoading}>
            {isLoading ? "Loading..." : submitText}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <div className="text-sm text-muted-foreground">
          {footerText}{" "}
          <a href={footerLink} className="text-primary font-medium hover:underline">
            {footerLinkText}
          </a>
        </div>
      </CardFooter>
    </Card>
  )
}

