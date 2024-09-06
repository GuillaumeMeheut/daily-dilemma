import { ChoiceSelector } from "@/components/ChoiceSelector";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  getDilemmaByDate,
  getChoices,
  getUser,
  getDilemmaAnswer,
} from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/server";
import { getSupabaseFormatDate } from "@/lib/utils";

export default async function Home() {
  const supabase = createClient();

  const dilemma = await getDilemmaByDate(
    supabase,
    getSupabaseFormatDate(new Date())
  );
  if (!dilemma) return;

  const choices = await getChoices(supabase, dilemma.id);
  if (!choices) return;

  const { user } = await getUser(supabase);

  let dilemmaAnswer = null;

  if (user) {
    dilemmaAnswer = await getDilemmaAnswer(supabase, user.id, dilemma.id);
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Daily Dilemma</CardTitle>
        <CardDescription>Make your choice wisely</CardDescription>
      </CardHeader>
      <CardContent>
        <h2 className="text-xl font-semibold mb-2">{dilemma.title}</h2>
        <p className="mb-4">{dilemma.description}</p>
        <ChoiceSelector
          choices={choices}
          user={user}
          dilemmaId={dilemma.id}
          answered={!!dilemmaAnswer}
          choiceId={dilemmaAnswer?.choice_id}
        />
      </CardContent>
    </Card>
  );
}
