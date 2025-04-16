import { useContext } from "react";
import { SalaryCalculationContext } from "@/context/SalaryCalculatorContext";

export const useFormUpdate = () => {
  const { dispatch } = useContext(SalaryCalculationContext);

  const handleAmountChange = (amount: number) =>
    dispatch({ type: "SET_AMOUNT", payload: amount });

  const handleOptionChange = (option: "bruto" | "neto" | "tooandjakulu") =>
    dispatch({ type: "SET_OPTION", payload: option });

  const toggleTTMEmployer = () => dispatch({ type: "TOGGLE_TTM_EMPLOYER" });

  const toggleTTMEmployee = () => dispatch({ type: "TOGGLE_TTM_EMPLOYEE" });

  const handlePensionPercentSelect = (value: 2 | 4 | 6 | false) =>
    dispatch({ type: "SET_PENSION_CALCULATED", payload: value });

  return {
    handleAmountChange,
    handleOptionChange,
    toggleTTMEmployer,
    toggleTTMEmployee,
    handlePensionPercentSelect,
  };
};
