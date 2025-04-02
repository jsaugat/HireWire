import { isUserAuthenticated } from '@/lib/actions/auth.action';
import Link from 'next/link'
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react'

export default async function RootLayout({ children }: { children: ReactNode }) {
  const isUserLoggedIn = await isUserAuthenticated();
  if (!isUserLoggedIn) {
    redirect('/signin');
  }

  return (
    <div className='root-layout'>
      <nav>
        <Link href="/">
          <h2 className='text-primary-100'>
            HireWire
          </h2>
        </Link>
      </nav>
      {children}
    </div>
  )
}
