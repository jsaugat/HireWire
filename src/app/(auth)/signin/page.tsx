"use client"

import { useState } from "react"
import { AuthForm } from "@/components/auth/auth-form"
import type { SignInFormValues } from "@/lib/auth-schema"
import { useRouter } from "next/navigation"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/firebase/client"
import { toast } from "sonner"
import { signIn } from "@/lib/actions/auth.action"

export default function SignInPage() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSignIn = async (values: SignInFormValues) => {
    setLoading(true)
    const { email, password } = values
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const idToken = await userCredential.user.getIdToken()
      if (!idToken) {
        toast.error("Failed to sign in")
        return
      }
      const response = await signIn({
        email, idToken
      })
      if (!response.success) {
        console.error("Sign in failed:", response.message)
        toast.error("Failed to sign in", {
          description: response.message
        })
        return
      }
      console.log("Sign in successful")
      toast.success("Sign in successful", {
        description: "You are now signed in."
      })
      router.push("/")
    } catch (error) {
      console.error("Sign in failed:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="signin-page flex min-h-screen items-center justify-center p-4">
      <div className="signin-form__container w-full max-w-md">
        <AuthForm type="signin" onSubmit={handleSignIn} isLoading={loading} />
      </div>
    </div>
  )
}

