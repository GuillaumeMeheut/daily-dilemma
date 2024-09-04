import CardSign from "@/components/Auth/CardSign";
import { signIn } from "@/lib/auth-helpers/server";
import { getUser } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const supabase = createClient();

  const { user } = await getUser(supabase);

  if (user) redirect("/");

  return <CardSign isSignIn={true} onSubmit={signIn} />;
}
