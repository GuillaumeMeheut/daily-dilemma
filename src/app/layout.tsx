import type { Metadata } from "next";
import "../styles/globals.css";

import { Inter } from "next/font/google";

import { cn } from "@/lib/utils";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/Toasts/toaster";
import { Navbar } from "@/components/Navbar/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Daily Dilemma",
  description: "One dilemma every day.",
  keywords: ["dilemma"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <Navbar />
        <main className="flex min-h-screen flex-col items-center justify-between md:p-24 p-8">
          {children}
        </main>
        <Suspense>
          <Toaster />
        </Suspense>
      </body>
    </html>
  );
}
