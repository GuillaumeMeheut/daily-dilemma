"use client";
import { onAuthStateChanged, signInWithGoogle, signOut } from "@/lib/auth";
import { User } from "firebase/auth";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

function useUserSession(initialUser: User | null | undefined) {
  // The initialUser comes from the server via a server component
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

      // refresh when user changed to ease testing
      if (user?.email !== authUser?.email) {
        router.reload();
      }
    });
  }, [user]);

  return user;
}

type HeaderProps = {
  initialUser: User | null | undefined;
};

export default function Header({ initialUser }: HeaderProps) {
  const user = useUserSession(initialUser);

  const handleSignOut = () => {
    signOut();
  };

  const handleSignIn = () => {
    signInWithGoogle();
  };

  return <header>header</header>;
}
