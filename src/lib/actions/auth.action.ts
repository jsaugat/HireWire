/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

/**
 * The file is specifically designed for database operations related to user authentication.
 * 
 */

import { db, auth } from "@/firebase/admin";
import { cookies } from "next/headers";

const ONE_WEEK = 60 * 60 * 24 * 7 * 1000;
const RESPONSE = (success: boolean, message: string) => ({ success, message });

export const signUp = async (params: SignUpParams) => {
  const { uid, name, email } = params;

  try {
    // Create user in Firestore
    await db.collection('users').doc(uid).set({
      name,
      email,
    });
    return RESPONSE(true, "Acccount created successfully, please sign in!");
  } catch (error: any) {
    console.error("Failed to create user:", error);
    if (error.code === "auth/email-already-exists") {
      return RESPONSE(false, "Email already in use");
    }
    return RESPONSE(false, `Failed to register new user. ${error.message}`);
  }
}

export async function signIn(params: SignInParams) {
  const { email, idToken } = params;
  try {
    // Check if user exists
    const user = await auth.getUserByEmail(email)
    if (!user) {
      return RESPONSE(false, "User not found");
    }
    // Set session cookie
    await setSessionCookie(idToken);
    return RESPONSE(true, "User signed in successfully");
  } catch (error: any) {
    return RESPONSE(false, `Failed to sign in. ${error.message}`);
  }
}

export async function setSessionCookie(idToken: string) {
  const cookieStore = await cookies()

  //? Create Firebase session cookie 
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: ONE_WEEK
  })

  cookieStore.set("session", sessionCookie, {
    maxAge: ONE_WEEK,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  })
}

export async function getAuthUser(): Promise<User | null> {
  const cookieStore = await cookies();
  try {
    const session = cookieStore.get("session")?.value;
    if (!session) return null;

    // Verify session cookie
    const decodedClaims = await auth.verifySessionCookie(session, true);

    // Utilise the decoded claims to get user data from FIRESTORE (not Firebase Auth because it only stores user credentials like email, UID and not the whole user data)
    const userRecord = await db.collection('users').doc(decodedClaims.uid).get();
    if (!userRecord) return null;
    return {
      ...userRecord.data(),
      id: userRecord.id
    } as User;
  } catch (error) {
    console.error("Failed to get user:", error);
    return null;
  }
}

export async function isUserAuthenticated() {
  const user = await getAuthUser();
  return !!user;
}