"use client";
import { signInWithGoogle, signOut } from "@/lib/firebase/auth";
import style from "./style.module.scss";
import Flags from "./Flags";
import { useAuth } from "@/hooks/useAuth";

export default function Header() {
  const user = useAuth();

  return (
    <header className={style.header}>
      {/* <p>{t("SuggestDilemma")}</p> */}
      <h1>Daily dilemma</h1>
      <div>
        <Flags />
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
