"use client";
import { Lang } from "@/lib/locales/types";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import Image from "next/image";

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
  const pathname = usePathname();
  if (currentLang === lang) return;

  const newPathname = pathname.replace(currentLang, lang);

  return (
    <Link href={newPathname}>
      <li>
        <Image src={img} alt={alt} width={60} height={35} />
      </li>
    </Link>
  );
};
