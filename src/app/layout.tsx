import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner"
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased pattern font-geist`}
      >
        {children}
        <div className="h-[50vh] footer-gradient border-t p-16">
          <div className="max-w-7xl mx-auto px-16 max-sm:px-4">hello footer</div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
