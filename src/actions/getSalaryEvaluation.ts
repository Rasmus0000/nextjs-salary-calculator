'use server';

export async function getSalaryEvaluation(
  neto: number,
  onNewToken: (token: string) => void
) {
  const prompt = `
Loo lühike hinnang, kuidas on võimalik elada Eestis iga kuu ~${neto} euroga. 
Keskendu kodule, toidule ja elukvaliteedile. Arvesta, et Eesti keskmine netopalk on 1700 eurot. 
Hoia vastus lühem kui 400 karakterit.`;

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4-turbo",
      messages: [{ role: "user", content: prompt }],
      stream: true,
    }),
  });

  if (!res.body) {
    throw new Error('No response body from OpenAI');
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder('utf-8');
  let done = false;
  let fullText = "";

  while (!done) {
    const { value, done: doneReading } = await reader.read();
    done = doneReading;
    const chunkValue = decoder.decode(value, { stream: true });
    fullText += chunkValue;
    onNewToken(chunkValue);
  }

  return fullText;
}
