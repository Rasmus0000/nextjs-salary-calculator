// app/api/salary-evaluation/route.ts
import { NextResponse } from "next/server";

export const runtime = "edge"; // Use Edge runtime for streaming

export async function POST(request: Request) {
  const { neto } = await request.json();
  const prompt = `
Loo lühike hinnang, kuidas on võimalik elada Eestis iga kuu ~${neto} euroga.
Keskendu kodule, toidule ja elukvaliteedile. Arvesta, et Eesti keskmine netopalk on 1700 eurot.
Hoia vastus lühem kui 400 karakterit.
`;

  // Call OpenAI's streaming endpoint
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4-turbo",
      messages: [{ role: "user", content: prompt }],
      stream: true,
    }),
  });

  if (!res.body) {
    return new NextResponse("No response body", { status: 500 });
  }

  // Return the response stream directly.
  return new NextResponse(res.body, {
    headers: {
      "Content-Type": "text/event-stream",
    },
  });
}
