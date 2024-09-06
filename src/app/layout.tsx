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
      <body className={cn("font-sans antialiased", inter.variable)}>
        <Navbar />
        <main className="min-h-[calc(100vh-72px)] flex flex-col items-center justify-center p-4">
          {children}
        </main>
        <Suspense>
          <Toaster />
        </Suspense>
      </body>
    </html>
  );
}
