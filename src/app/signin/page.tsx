import CardSign from "@/components/Auth/CardSign";
import { signIn } from "@/lib/auth-helpers/server";

export default function SignIn() {
  return <CardSign isSignIn={true} onSubmit={signIn} />;
}
