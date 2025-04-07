import { isUserAuthenticated } from '@/lib/actions/auth.action';
import Image from 'next/image';
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
        <Link href="/" className='flex items-center gap-2'>
          <Image
            src="/hirewire.svg"
            alt="HireWire Logo"
            width={16}
            height={16}
            className='rounded-full'
          />
          <p className='text-lg text-primary-100 uppercase'>
            HireWire
          </p>
        </Link>
      </nav>
      {children}
    </div>
  )
}
