"use client"

import { useState } from "react"
import { AuthForm } from "@/components/auth/auth-form"
import type { SignUpFormValues } from "@/lib/auth-schema"
import { useRouter } from "next/navigation"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/firebase/client"
import { signUp } from "@/lib/actions/auth.action"
import { toast } from "sonner"

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignUp = async (values: SignUpFormValues) => {
    setIsLoading(true)

    try {
      // Here you would implement your actual sign-up logic
      console.log("Sign up values:", values)

      //? Create user in Firebase Auth
      const userCredentials = await createUserWithEmailAndPassword(auth, values.email, values.password)
      //? Create user in database using a server action
      const result = await signUp({
        uid: userCredentials.user.uid,
        name: values.name,
        email: values.email,
        password: values.password,
      })

      if (!result?.success) {
        console.error("Sign up failed:", result?.message)
        toast.error("Sign up failed", {
          description: result?.message,
        })
        return
      }

      console.log("Sign up successful")
      toast("Sign up successful", {
        description: "Your account has been created.",
      })

      // Redirect after successful sign-up
      router.push("/signin")
    } catch (error) {
      console.error("Sign up failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="signup-page flex min-h-screen items-center justify-center p-4">
      <div className="signup-form__container w-full max-w-md">
        <AuthForm
          type="signup"
          onSubmit={(values) => handleSignUp(values as SignUpFormValues)}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}

