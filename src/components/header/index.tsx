"use client";
import { signInWithGoogle, signOut } from "@/lib/firebase/auth";
import style from "./index.module.scss";
import Flags from "./Flags";
import { useAuth } from "@/hooks/useAuth";
import { useI18n } from "@/lib/locales/client";
import Image from "next/image";

export default function Header() {
  const user = useAuth();
  const t = useI18n();

  return (
    <header className={style.header}>
      <p className={style.suggestDilemma}>{t("SuggestDilemma")}</p>
      <h1>Daily dilemma</h1>
      <div className={style.wrapper}>
        {user ? (
          <div className={style.infosContainer}>
            <p>{user.displayName}</p>
            <button onClick={signOut}>
              <Image
                src="/assets/signout.svg"
                alt={"Sign out"}
                width={30}
                height={30}
              />
            </button>
          </div>
        ) : (
          <button onClick={signInWithGoogle}>
            <Image
              src="/assets/signin.svg"
              alt={"Sign in"}
              width={30}
              height={30}
            />
          </button>
        )}
        <Flags />
      </div>
    </header>
  );
}
