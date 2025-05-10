import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Bricolage_Grotesque } from 'next/font/google'
import { Manrope } from 'next/font/google'
import { Toaster } from "@/components/ui/sonner"
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bricolage_grotesque = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bricolage_grotesque',
})
const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
})

export const metadata: Metadata = {
  title: "HIre Wire",
  description: "Ultimate Interview Preparation AI Agent Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={"dark"}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bricolage_grotesque.variable + ' ' + manrope.variable} antialiased pattern footer-gradient font-manrope`}
      >
        {children}
        <div className="h-10 flex items-center justify-center p-6 border-y gap-1">Developed by{" "}
          <Link href="https://saugatjoshi.com.np" className="text-blue-400">Saugat Joshi</Link>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
