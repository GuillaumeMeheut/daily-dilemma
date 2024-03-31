import type { Metadata } from "next";
import { getAuthenticatedAppForUser } from "@/lib/firebase";
import Header from "@/components/header";
import "./global.scss";
import style from "./layout.module.scss";
import { Judson, Signika } from "next/font/google";
import { getI18n } from "@/lib/locales/server";
import { Lang } from "@/lib/locales/settings";
import { I18nProviderClient } from "@/lib/locales/client";
import { ProvideAuth } from "@/hooks/useAuth";

export const dynamic = "force-dynamic";

const judson = Judson({
  style: "italic",
  weight: "400",
  variable: "--font-judson",
  subsets: ["latin"],
});
const signika = Signika({
  subsets: ["latin"],
  variable: "--font-signika",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Daily dilemma",
  description: "1 dilemma everyday",
};

export default async function RootLayout({
  children,
  params: { lang },
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Lang };
}>) {
  const { currentUser } = await getAuthenticatedAppForUser();

  const t = await getI18n();

  return (
    <html lang={lang} className={`${judson.variable} ${signika.variable}`}>
      <body>
        <I18nProviderClient locale={lang}>
          <ProvideAuth initialUser={currentUser}>
            <Header />
            <p>{t("hello")} server</p>
            {children}
          </ProvideAuth>
        </I18nProviderClient>
      </body>
    </html>
  );
}
