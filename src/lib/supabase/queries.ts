import { cache } from "react";
import { SupabaseClient } from "@supabase/supabase-js";

export type Stats = {
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
};

type DilemmaAnswer = { id: number; choice_id: number };

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

export const getLastDescriptionDilemmaCount = cache(
  async (supabase: SupabaseClient, userId: string): Promise<number | null> => {
    const { data, error } = await supabase
      .from("user_profiles")
      .select("last_description_dilemma_count")
      .eq("id", userId)
      .single();

    return data?.last_description_dilemma_count;
  }
);

export const getUserStatsById = cache(
  async (supabase: SupabaseClient, userId: string): Promise<Stats | null> => {
    const { data: userStats, error } = await supabase
      .from("user_profiles")
      .select(
        "openness, conscientiousness, extraversion, agreeableness, neuroticism"
      )
      .eq("id", userId)
      .single();

    return userStats;
  }
);

export const getNumbersOfUserResponses = cache(
  async (supabase: SupabaseClient, userId: string): Promise<number | null> => {
    const { count, error } = await supabase
      .from("user_responses")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

    return count;
  }
);

export const getDilemmaAnswer = cache(
  async (
    supabase: SupabaseClient,
    userId: string,
    dilemmaId: number
  ): Promise<DilemmaAnswer | null> => {
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

export const updateUserStats = cache(
  async (supabase: SupabaseClient, userId: string, choiceId: number) => {
    const [choiceStats, currentStats] = await Promise.all([
      getChoiceStatsById(supabase, choiceId),
      getUserStatsById(supabase, userId),
    ]);

    if (!choiceStats || !currentStats) {
      console.error("Missing stats for update");
      return;
    }

    // Explicitly typed keys of the Stats object
    const statKeys: (keyof Stats)[] = [
      "openness",
      "conscientiousness",
      "extraversion",
      "agreeableness",
      "neuroticism",
    ];

    const updatedStats = statKeys.reduce((acc, trait) => {
      const newValue = (currentStats[trait] || 0) + (choiceStats[trait] || 0);
      if (newValue !== currentStats[trait]) {
        acc[trait] = newValue;
      }
      return acc;
    }, {} as Partial<Stats>);

    if (Object.keys(updatedStats).length === 0) {
      console.log("No stats to update");
      return;
    }

    const { data, error } = await supabase
      .from("user_profiles")
      .update(updatedStats)
      .eq("id", userId);

    if (error) {
      console.error("Error updating user stats:", error.message);
    }
  }
);
export const updateUserDescription = cache(
  async (
    supabase: SupabaseClient,
    userId: string,
    description: string,
    currentDilemmaCount: number
  ) => {
    const { error } = await supabase
      .from("user_profiles")
      .update({
        description,
        last_description_dilemma_count: currentDilemmaCount,
      })
      .eq("id", userId);

    if (error) {
      console.error("Error updating user description:", error.message);
    }
  }
);

export const getUserDescription = cache(
  async (supabase: SupabaseClient, userId: string): Promise<string> => {
    const { data, error } = await supabase
      .from("user_profiles")
      .select("description")
      .eq("id", userId)
      .single();

    if (error) throw error;
    return data.description;
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

export const getChoiceStatsById = cache(
  async (supabase: SupabaseClient, choiceId: number): Promise<Stats | null> => {
    const { data: choiceStats, error } = await supabase
      .from("choices")
      .select(
        "openness, conscientiousness, extraversion, agreeableness, neuroticism"
      )
      .eq("id", choiceId)
      .single();

    return choiceStats;
  }
);
