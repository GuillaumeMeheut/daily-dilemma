import { Stats } from "../supabase/queries";

export async function fetchAIResponse(stats: Stats, nbResponses: number) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}api/openai`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ stats, nbResponses }),
    });

    if (!res.ok) throw new Error("AI service failed");

    const { description } = await res.json();
    return description;
  } catch (error) {
    console.error("Failed to fetch AI response:", error);
    return null;
  }
}
