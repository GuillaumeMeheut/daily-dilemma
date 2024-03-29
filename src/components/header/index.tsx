"use client";
import {
  onAuthStateChanged,
  signInWithGoogle,
  signOut,
} from "@/lib/firebase/auth";
import { User } from "firebase/auth";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import style from "./style.module.scss";
import Flag from "./Flag";
import { useTranslation } from "@/lib/i18n/client";
import { Lang } from "@/lib/i18n/settings";

export type InitialUser = User | null | undefined;

function useUserSession(initialUser: InitialUser) {
  const [user, setUser] = useState<InitialUser>(initialUser);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((authUser) => {
      setUser(authUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    onAuthStateChanged((authUser) => {
      if (!user) return;

      if (user?.email !== authUser?.email) router.refresh();
    });
  }, [user]);

  return user;
}

type HeaderProps = {
  initialUser: InitialUser;
};

export default function Header({ initialUser }: HeaderProps) {
  const { lang }: { lang: Lang } = useParams();
  const { t } = useTranslation(lang);
  const user = useUserSession(initialUser);

  return (
    <header className={style.header}>
      <p>{t("SuggestDilemma")}</p>
      <h1>Daily dilemma</h1>
      <div>
        <Flag />
        {user ? (
          <div>
            <p>{user.displayName}</p>
            <button onClick={signOut}>Sign out</button>
          </div>
        ) : (
          <button onClick={signInWithGoogle}>Sign in</button>
        )}
      </div>
    </header>
  );
}
