import { ChoiceSelector } from "@/components/ChoiceSelector";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { getDilemma, getChoices, getUser } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = createClient();

  const dilemma = await getDilemma(supabase);
  if (!dilemma) return;

  const choices = await getChoices(supabase, dilemma.id);
  if (!choices) return;

  const { user } = await getUser(supabase);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Daily Dilemma</CardTitle>
        <CardDescription>Make your choice wisely</CardDescription>
      </CardHeader>
      <CardContent>
        <h2 className="text-xl font-semibold mb-2">{dilemma.title}</h2>
        <p className="mb-4">{dilemma.description}</p>
        <ChoiceSelector choices={choices} user={user} />
      </CardContent>
    </Card>
  );
}
