import { cache } from "react";
import { SupabaseClient } from "@supabase/supabase-js";

export const getUser = cache(async (supabase: SupabaseClient) => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  return { user, error };
});

export const getDilemma = cache(async (supabase: SupabaseClient) => {
  const { data: dilemma, error } = await supabase
    .from("dilemmas")
    .select()
    .order("id", { ascending: false })
    .single();

  return dilemma;
});

export const getChoices = cache(
  async (supabase: SupabaseClient, dilemmaId: number) => {
    const { data: choices, error } = await supabase
      .from("choices")
      .select()
      .eq("dilemma_id", dilemmaId);

    return choices;
  }
);
