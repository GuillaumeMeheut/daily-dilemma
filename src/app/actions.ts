"use server";

import {
  addDilemmaResponseAndIncreaseChoiceCount,
  getDilemmaAnswer,
} from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/server";
import { getErrorRedirect, getStatusRedirect } from "@/lib/utils";
import { User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

export const submitChoice = async (
  formData: FormData,
  user: User | null,
  dilemmaId: number
) => {
  if (!user) {
    redirect(
      getErrorRedirect("/signin", "You must be logged", "Login and try again")
    );
  }

  const supabase = createClient();

  const dilemmaAnswer = await getDilemmaAnswer(supabase, user.id, dilemmaId);

  if (dilemmaAnswer) {
    redirect(
      getErrorRedirect(
        "/",
        "Only one answer by dilemma",
        "You can only answer one time by dilemma, come back tomorrow for a new one!"
      )
    );
  }

  const choiceId = Number(formData.get("choice"));

  await addDilemmaResponseAndIncreaseChoiceCount(
    supabase,
    user.id,
    dilemmaId,
    choiceId
  );

  redirect(getStatusRedirect(`/`, "Success!", "Response submitted."));
};
