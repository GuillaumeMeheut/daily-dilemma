"use client";
import { useChangeLocale } from "@/lib/locales/client";
import { Lang } from "@/lib/locales/settings";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

type Flag = { img: string; lang: Lang; alt: string };

export default function Flags() {
  // const changeLocale = useChangeLocale();
  // const locale = useCurrentLocale();

  const flags: Flag[] = [
    { img: "/assets/flag_France.svg", lang: Lang.FR, alt: "French Flag" },
    { img: "/assets/flag_US.svg", lang: Lang.EN, alt: "US Flag" },
  ];

  return (
    <ul>
      {flags.map(({ img, lang, alt }) => (
        <Flag key={lang} img={img} lang={lang} alt={alt} />
      ))}
    </ul>
  );
}

const Flag = ({ img, lang, alt }: Flag) => {
  //TO-DO temporary solution while waiting for hooks of
  // next-international to be fixed
  const { lang: currentLang }: { lang: Lang } = useParams();
  if (currentLang === lang) return;

  const pathname = usePathname();
  const newPathname = pathname.replace(currentLang, lang);

  return (
    <Link href={newPathname}>
      <li>
        <p>{lang}</p>
        <img src={img} alt={alt} />
      </li>
    </Link>
  );
};
