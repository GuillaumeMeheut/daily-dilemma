import { cache } from "react";
import { SupabaseClient } from "@supabase/supabase-js";

export const getUser = cache(async (supabase: SupabaseClient) => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  return { user, error };
});

export const getUserProfile = cache(
  async (supabase: SupabaseClient, userId: string) => {
    const { data: userProfile, error } = await supabase
      .from("user_profiles")
      .select()
      .eq("id", userId)
      .single();

    return userProfile;
  }
);

export const getUserResponses = cache(
  async (supabase: SupabaseClient, userId: string) => {
    const { data: userProfile, error } = await supabase
      .from("user_responses")
      .select()
      .eq("user_id", userId);

    return userProfile;
  }
);

type DilemmaAnswer = { id: number; choice_id: number } | null;

export const getDilemmaAnswer = cache(
  async (
    supabase: SupabaseClient,
    userId: string,
    dilemmaId: number
  ): Promise<DilemmaAnswer> => {
    const { data: dilemmaAnswer, error } = await supabase
      .from("user_responses")
      .select("id, choice_id")
      .eq("user_id", userId)
      .eq("dilemma_id", dilemmaId)
      .single();

    if (error) {
      return null;
    }

    return dilemmaAnswer;
  }
);

export const addDilemmaResponse = cache(
  async (
    supabase: SupabaseClient,
    userId: string,
    dilemmaId: number,
    choiceId: number
  ) => {
    const { error } = await supabase.from("user_responses").insert([
      {
        user_id: userId,
        dilemma_id: dilemmaId,
        choice_id: choiceId,
      },
    ]);
    if (error) {
      console.log(error.message);
    }
  }
);

export const addDilemmaResponseAndIncreaseChoiceCount = cache(
  async (
    supabase: SupabaseClient,
    userId: string,
    dilemmaId: number,
    choiceId: number
  ) => {
    const { data, error } = await supabase.rpc(
      "increment_choice_and_add_response",
      {
        choice_id: choiceId,
        user_id: userId,
        dilemma_id: dilemmaId,
      }
    );

    if (error) {
      return error.message;
    }

    return data;
  }
);

export const getDilemmaByDate = cache(
  async (supabase: SupabaseClient, date: string) => {
    const { data: dilemma, error } = await supabase
      .from("dilemmas")
      .select()
      .eq("posting_date", date)
      .single();

    return dilemma;
  }
);

export const getChoices = cache(
  async (supabase: SupabaseClient, dilemmaId: number) => {
    const { data: choices, error } = await supabase
      .from("choices")
      .select()
      .eq("dilemma_id", dilemmaId)
      .order("id", { ascending: false });

    return choices;
  }
);
