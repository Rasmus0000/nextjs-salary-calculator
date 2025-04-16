import { useEffect, useRef, useState } from "react";
import { getSalaryEvaluation } from "@/actions/getSalaryEvaluation";

export const useAIResponse = (netSalary?: number) => {
  const [aiResponse, setAiResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const requestCounter = useRef(0);
  const lastQueriedNetSalary = useRef<number | null>(null);

  useEffect(() => {
    const current = netSalary;
    const previous = lastQueriedNetSalary.current;

    if (!current) return;
    if (previous !== null && Math.abs(current - previous) < 100) return;

    const evaluateWithOpenAi = async () => {
      const thisRequest = ++requestCounter.current;
      setLoading(true);

      try {
        const response = await getSalaryEvaluation(current);
        if (requestCounter.current === thisRequest) {
          setAiResponse(response);
          lastQueriedNetSalary.current = current;
        }
      } finally {
        if (requestCounter.current === thisRequest) {
          setLoading(false);
        }
      }
    };

    evaluateWithOpenAi();
  }, [netSalary]);

  return { loading, aiResponse };
};
