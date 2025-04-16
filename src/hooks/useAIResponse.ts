import { useEffect, useRef, useState } from "react";

export const useAIResponse = (netSalary?: number) => {
  const [aiResponse, setAiResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const requestCounter = useRef(0);
  const lastQueriedNetSalary = useRef<number>(0);
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (netSalary === undefined) return;
    const current = netSalary;
    const previous = lastQueriedNetSalary.current;
    if (previous !== null && Math.abs(current - previous) < 100) return;

    const evaluateWithOpenAi = async () => {
      const thisRequest = ++requestCounter.current;
      setAiResponse("");
      setLoading(true);

      if (controllerRef.current) {
        controllerRef.current.abort();
      }

      const controller = new AbortController();
      controllerRef.current = controller;

      try {
        const res = await fetch("/api/salary-evaluation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ neto: current }),
          signal: controller.signal,
        });

        if (!res.body) {
          throw new Error("No response body received from the server");
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let done = false;

        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;
          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n").filter((line) => line.trim() !== "");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const dataStr = line.slice(6).trim();
              
              if (dataStr === "[DONE]") {
                done = true;
                break;
              }

              try {
                const data = JSON.parse(dataStr);
                const content = data?.choices?.[0]?.delta?.content;
                if (content && requestCounter.current === thisRequest) {
                  setAiResponse((prev) => prev + content);
                }
              } catch (e) {
                console.error("Invalid JSON:", dataStr, e);
              }
            }
          }
        }

        if (requestCounter.current === thisRequest) {
          lastQueriedNetSalary.current = current;
        }
      } catch (error: unknown) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("Streaming error:", error);
        }
      }
      finally {
        if (requestCounter.current === thisRequest) {
          setLoading(false);
        }
      }
    };

    evaluateWithOpenAi();
  }, [netSalary]);

  return { loading, aiResponse };
};
