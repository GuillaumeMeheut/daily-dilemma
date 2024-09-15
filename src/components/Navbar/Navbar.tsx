import { createClient } from "@/lib/supabase/server";
import { Navlinks } from "./Navlinks";
import Link from "next/link";
import { Button } from "../ui/button";

export const Navbar = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="sticky top-0 px-6 py-4 bg-white flex justify-end  ">
      <Link href="/" className="mr-auto">
        <Button variant="link">Today&apos;s Dilemma</Button>
      </Link>
      <Link href="/profile">
        <Button variant="link">My profile</Button>
      </Link>

      <Navlinks user={user} />
    </nav>
  );
};
