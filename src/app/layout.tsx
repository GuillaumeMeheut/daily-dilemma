import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { getAuthenticatedAppForUser } from "@/lib/firebase";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Daily dilemma",
  description: "1 dilemma everyday",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { currentUser } = await getAuthenticatedAppForUser();

  return (
    <html lang="en">
      <head>{/* Add any necessary head content */}</head>
      <body>
        <Header initialUser={currentUser} />
        {children}
      </body>
    </html>
  );
}
