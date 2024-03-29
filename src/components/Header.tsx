"use client";
import { onAuthStateChanged, signInWithGoogle, signOut } from "@/lib/auth";
import { User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

function useUserSession(initialUser: User | null | undefined) {
  const [user, setUser] = useState(initialUser);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((authUser) => {
      setUser(authUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    onAuthStateChanged((authUser) => {
      if (user === undefined) return;

      if (user?.email !== authUser?.email) router.refresh();
    });
  }, [user]);

  return user;
}

type HeaderProps = {
  initialUser: User | null | undefined;
};

export default function Header({ initialUser }: HeaderProps) {
  const user = useUserSession(initialUser);
  console.log(user);

  const handleSignOut = () => {
    signOut();
  };

  const handleSignIn = () => {
    signInWithGoogle();
  };

  return (
    <header>
      {user ? (
        <button onClick={handleSignOut}>Sign out</button>
      ) : (
        <button onClick={handleSignIn}>Sign in</button>
      )}
    </header>
  );
}
