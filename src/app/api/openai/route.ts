import { NextRequest } from "next/server";
import OpenAI from "openai";

export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const {
      stats: {
        openness,
        conscientiousness,
        extraversion,
        agreeableness,
        neuroticism,
      },
      nbResponses,
    } = await request.json();

    if (
      openness === undefined ||
      conscientiousness === undefined ||
      extraversion === undefined ||
      agreeableness === undefined ||
      neuroticism === undefined ||
      nbResponses === undefined
    ) {
      return new Response(
        JSON.stringify({ error: "Missing required personality traits." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are an AI focused on psychological aspects of personality based on the Big Five traits: Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism. I'll provide values for each trait, ranging from -3 to +3, which represent how much this person leans into each trait. The values are calculated from answers to a series of dilemmas. 
    
          Based on the number of dilemmas answered and the trait values, create a concise, fun, and casual psychological profile. Include both personality strengths and challenges, and give examples of how this person might behave in everyday situations or social interactions. Keep the tone light, direct, and engaging. Aim for around 4-5 sentences.`,
        },
        {
          role: "user",
          content: `Dilemmas answered: ${nbResponses}, Openness: ${openness}, Conscientiousness: ${conscientiousness}, Extraversion: ${extraversion}, Agreeableness: ${agreeableness}, Neuroticism: ${neuroticism}`,
        },
      ],
      max_tokens: 250,
      temperature: 0.6,
    });

    const responseContent = completion.choices?.[0]?.message?.content;

    if (!responseContent) {
      throw new Error("No response content received from OpenAI.");
    }

    return new Response(JSON.stringify({ description: responseContent }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error:", error);

    const statusCode = error.response?.status || 500;
    const errorMessage =
      error.message ||
      "An unexpected error occurred while processing the request.";

    return new Response(JSON.stringify({ error: errorMessage }), {
      status: statusCode,
      headers: { "Content-Type": "application/json" },
    });
  }
}
