import { isUserAuthenticated } from '@/lib/actions/auth.action'
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react'

export default async function AuthLayout({ children }: { children: ReactNode }) {
  const isUserLoggedIn = await isUserAuthenticated();
  if (isUserLoggedIn) {
    redirect('/');
  }
  return (
    <div>{children}</div>
  )
}
