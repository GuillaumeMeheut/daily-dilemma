import type { Metadata } from "next";
import { getAuthenticatedAppForUser } from "@/lib/firebase";
import Header from "@/components/header";
import "./global.scss";
import style from "./layout.module.scss";
import { dir } from "i18next";
import { Lang, languages } from "@/lib/i18n/settings";
import { useTranslation } from "@/lib/i18n";
import { Judson, Signika } from "next/font/google";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

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

  const { t } = await useTranslation(lang, "");

  return (
    <html
      lang={lang}
      dir={dir(lang)}
      className={`${judson.variable} ${signika.variable}`}
    >
      <body>
        <Header initialUser={currentUser} />
        <p>{t("test")}</p>
        {children}
      </body>
    </html>
  );
}
