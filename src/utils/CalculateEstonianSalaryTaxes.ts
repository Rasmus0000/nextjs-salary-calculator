import { resultsType } from "@/types/types";

export interface TaxCalculationParams {
  option: 'bruto' | 'neto' | 'tooandjakulu';
  amount: number;
  isTtMEmployer: boolean;
  isTtMEmployee: boolean;
  isPensionCalculated: 2 | 4 | 6 | false;
}

export const calculateSalary = ({
  option,
  amount,
  isTtMEmployer,
  isTtMEmployee,
  isPensionCalculated,
}: TaxCalculationParams):resultsType  => {
  const socialTaxRate = 0.33; // Sotsiaalmaks 33%
  const unemploymentEmployerRate = 0.008; // Töötuskindlustusmakse (tööandja): 0.8%
  const unemploymentEmployeeRate = 0.016; // Töötaja töötuskindlustusmakse (töötaja): 1.6%
  const incomeTaxRate = 0.22; // Tulumaks 22%

  let brutoSalary = option === 'bruto' ? amount : undefined;
  let netSalary = option === 'neto' ? amount : undefined;
  let totalEmployerCost = option === 'tooandjakulu' ? amount : undefined;
  let socialTax = 0;
  let unemploymentEmployer = 0;
  let unemploymentEmployee = 0;
  let pension = 0;
  let incomeTax = 0;

  const IncomeTaxWithEstonianFormula = (taxableIncome: number, bruto:number): number => {
    let taxFree = 0;

    if (bruto <= 1200) {
      taxFree = 654;
    } else if (bruto <= 2099) {
      taxFree = 654 - (0.72667 * (bruto - 1200));
    } else {
      taxFree = 0;
    }

    const effectiveTaxable = taxableIncome - taxFree;
    const taxAmount = effectiveTaxable * incomeTaxRate;
    return taxAmount >= 0 ? taxAmount : 0;
  };

  const calculateFromBruto = (bruto: number) => {
    brutoSalary = bruto;
    socialTax = bruto * socialTaxRate;
    unemploymentEmployer = isTtMEmployer ? bruto * unemploymentEmployerRate : 0;
    pension = isPensionCalculated ? bruto * (isPensionCalculated / 100) : 0;
    unemploymentEmployee = isTtMEmployee ? bruto * unemploymentEmployeeRate : 0;
    const taxableIncome = bruto - unemploymentEmployee - pension;
    incomeTax = IncomeTaxWithEstonianFormula(taxableIncome, bruto);
    
    netSalary = bruto - incomeTax - unemploymentEmployee - pension;
    totalEmployerCost = bruto + unemploymentEmployer + socialTax;
  };

  const calculateFromNeto = (neto: number) => {
    const tolerance = 0.01;
    let low = neto;
    let high = neto * 2;
    let bruto = (low + high) / 2;

    let calculatedNeto = 0;

    while ((high - low) > tolerance) {
      const unemploymentEmployee = isTtMEmployee ? bruto * unemploymentEmployeeRate : 0;
      const pension = isPensionCalculated ? bruto * (isPensionCalculated / 100) : 0;
      const taxableIncome = bruto - unemploymentEmployee - pension;
      const incomeTaxAfterFreeAmount = IncomeTaxWithEstonianFormula(taxableIncome, bruto);
      calculatedNeto = bruto - incomeTaxAfterFreeAmount - unemploymentEmployee - pension;

      if (calculatedNeto < neto) {
        low = bruto;
      } else {
        high = bruto;
      }

      bruto = (low + high) / 2;
    }

    calculateFromBruto(bruto);
  };

  // Calculate based on what is provided
  if (netSalary) {
    calculateFromNeto(netSalary);
  } else if (brutoSalary) {
    calculateFromBruto(brutoSalary);
  } else if (totalEmployerCost) {
    brutoSalary = totalEmployerCost / (1 + socialTaxRate + (isTtMEmployer ? unemploymentEmployerRate : 0));
    calculateFromBruto(brutoSalary);
  }

  const roundToTwoDecimals = (value: number): number => {
    return Math.round(value * 100) / 100;
  };

  const resultsWithText = [
    { text: 'Tööandja kulu kokku (palgafond):', value: roundToTwoDecimals(totalEmployerCost ?? 0) },
    { text: 'Sotsiaalmaks:', value: roundToTwoDecimals(socialTax) },
    { text: 'Töötuskindlustusmakse (tööandja):', value: roundToTwoDecimals(unemploymentEmployer) },
    { text: 'Brutopalk:', value: roundToTwoDecimals(brutoSalary ?? 0) },
    { text: 'Kogumispension (II sammas):', value: roundToTwoDecimals(pension) },
    { text: 'Töötuskindlustusmakse (töötaja):', value: roundToTwoDecimals(unemploymentEmployee) },
    { text: 'Tulumaks:', value: roundToTwoDecimals(incomeTax) },
    { text: 'Netopalk:', value: roundToTwoDecimals(netSalary ?? 0) },
  ];



  return {resultLines: resultsWithText, netSalary: Math.round(netSalary ?? 0)};
};
