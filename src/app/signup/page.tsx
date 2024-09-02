import { signUp } from "@/lib/auth-helpers/server";
import CardSign from "@/components/Auth/CardSign";

export default function SignUp() {
  return <CardSign isSignIn={false} onSubmit={signUp} />;
}
