import Link from 'next/link'
import React, { ReactNode } from 'react'

export default function RootLayout({ children }: { children: ReactNode }) {
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
