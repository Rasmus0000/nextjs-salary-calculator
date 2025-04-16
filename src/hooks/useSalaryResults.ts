import { useEffect, useState } from "react";
import { calculateSalary } from "@/utils/CalculateEstonianSalaryTaxes";
import { resultsType } from "@/types/types";
import { TaxCalculationParams } from "@/utils/CalculateEstonianSalaryTaxes";

export const useSalaryResults = (params: TaxCalculationParams) => {
  const [results, setResults] = useState<resultsType>({
    resultLines: [],
    netSalary: 0,
  });

  useEffect(() => {
    const newResults: resultsType = calculateSalary(params);
    setResults(newResults);
  }, [
    params.option,
    params.amount,
    params.isTtMEmployer,
    params.isTtMEmployee,
    params.isPensionCalculated
  ]);

  return results;
};
