"use client";
import { onAuthStateChanged } from "@/lib/firebase/auth";
import { User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

export type InitialUser = User | null | undefined;

type ProvideAuthProps = {
  initialUser: InitialUser;
  children: React.ReactNode;
};

const AuthContext = createContext<InitialUser | undefined>(undefined);

export function ProvideAuth({ initialUser, children }: ProvideAuthProps) {
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

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};
