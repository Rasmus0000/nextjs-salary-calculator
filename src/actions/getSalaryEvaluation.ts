'use server';

import { ChatOpenAI } from "@langchain/openai";

const openai = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  modelName: "gpt-4-turbo"
});

export async function getSalaryEvaluation(neto: number) {
  const prompt = `
Loo lühike hinnang, kuidas on võimalik elada Eestis iga kuu ~${neto} euroga. Keskendu kodule, toidule ja elukvaliteedile. Arvesta, et Eesti keskmine netopalk on 1700 eurot. Hoia vastus lühem kui 400 karakterit.`;

  const response = await openai.invoke(prompt);

  return response.content as string;
}
