import { signUp } from "@/lib/auth-helpers/server";
import CardSign from "@/components/Auth/CardSign";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/supabase/queries";

export default async function SignUp() {
  const supabase = createClient();

  const { user } = await getUser(supabase);

  if (user) redirect("/");
  return <CardSign isSignIn={false} onSubmit={signUp} />;
}
