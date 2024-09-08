import { NextRequest } from "next/server";
import OpenAI from "openai";

export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const {
      openness,
      conscientiousness,
      extraversion,
      agreeableness,
      neuroticism,
    } = await request.json(); // Parse the JSON body from the request

    if (
      openness === undefined ||
      conscientiousness === undefined ||
      extraversion === undefined ||
      agreeableness === undefined ||
      neuroticism === undefined
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
          content: `Based on the Big Five personality traits, I'll provide a set of values for Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism. Please create a fun,
           concise psychological profile that includes both personality strengths and challenges. Keep the description casual, but include examples of how this person might act in everyday
           situations or interactions. Return the response in JSON format with the key 'description'.`,
        },
        {
          role: "user",
          content: `Openness ${openness}, Conscientiousness ${conscientiousness}, Extraversion ${extraversion}, Agreeableness ${agreeableness}, Neuroticism ${neuroticism}`,
        },
      ],
      max_tokens: 200,
      temperature: 0.8,
    });

    const responseContent = completion.choices?.[0]?.message?.content;
    console.log(responseContent);

    if (!responseContent) {
      throw new Error("No response content received from OpenAI.");
    }

    const jsonResponse = JSON.parse(responseContent);

    return new Response(JSON.stringify(jsonResponse), {
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
