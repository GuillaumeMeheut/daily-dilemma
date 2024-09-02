"use client";

import { useTransition } from "react";
import { Button } from "../ui/button";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { signOut } from "@/lib/auth-helpers/server";
import { usePathname } from "next/navigation";

type NavlinksProps = {
  user: User | null;
};

export const Navlinks = ({ user }: NavlinksProps) => {
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  const onSubmit = (e: FormData) => {
    startTransition(() => {
      signOut(e);
    });
  };

  return (
    <>
      {user ? (
        <form>
          <input type="hidden" name="pathName" value={pathname} />
          <Button formAction={onSubmit} type="submit" disabled={isPending}>
            Sign out
          </Button>
        </form>
      ) : (
        <>
          <Link href="/signin">
            <Button className="mr-4" variant="link">
              Sign In
            </Button>
          </Link>
          <Link href="/signup">
            <Button variant="link">Sign Up</Button>
          </Link>
        </>
      )}
    </>
  );
};
