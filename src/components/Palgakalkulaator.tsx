import { useContext } from "react";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useAIResponse } from "@/hooks/useAIResponse";
import { useFormUpdate } from "@/hooks/useFormUpdate";
import AmountTypeSelect from "./form/AmountTypeSelect";
import AmountInput from "./form/AmountInput";
import ResultsCard from "./form/ResultsCard";
import CheckBox from "./form/CheckBox";
import PensionCheckBox from "./form/PensionCheckBox";
import { useSalaryResults } from "@/hooks/useSalaryResults";
import { SalaryCalculationContext } from "@/context/SalaryCalculatorContext";

const Palgakalkulaator = () => {
  const { state } = useContext(SalaryCalculationContext);
  const results = useSalaryResults({
    option: state.option,
    amount: state.amount,
    isTtMEmployer: state.isTtMEmployer,
    isTtMEmployee: state.isTtMEmployee,
    isPensionCalculated: state.isPensionCalculated,
  });
  const debouncedNetSalary = useDebouncedValue(results.netSalary, 600);
  const { loading, aiResponse } = useAIResponse(debouncedNetSalary);
  const {
    handleAmountChange,
    handleOptionChange,
    toggleTTMEmployer,
    toggleTTMEmployee,
    handlePensionPercentSelect,
  } = useFormUpdate();

  return (
    <>
      <div className="grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 gap-8">
        <form className="flex flex-col justify-start gap-y-6">
          <div className="flex flex-col gap-y-2">
            <AmountTypeSelect
              name="inputOption"
              value={state.option}
              onChange={handleOptionChange}
            />
            <AmountInput amount={state.amount} onChange={handleAmountChange} />
          </div>
          <div className="flex flex-col gap-y-2">
            <CheckBox
              key={"tooandja"}
              check={state.isTtMEmployer}
              onChange={toggleTTMEmployer}
              text="Tööandja töötuskindlustusmakse (0.8%)"
              name="tooandja-kindlustusmakse"
            />
            <CheckBox
              key={"tootaja"}
              check={state.isTtMEmployee}
              onChange={toggleTTMEmployee}
              text="Töötaja (kindlustatu) töötuskindlustusmakse (1.6%)"
              name="tootaja-kindlustusmakse"
            />
            <PensionCheckBox
              value={state.isPensionCalculated}
              onChange={handlePensionPercentSelect}
              text="Kogumispension (II sammas)"
              name="kogumispension"
            />
          </div>
        </form>
        <ResultsCard results={results.resultLines} />
      </div>
      <div className="flex flex-col gap-y-2">
        <p className="font-bold">AI hinnang:</p>
        <div className="flex  p-4 bg-[#FCE9E9] min-h-[100px]">
          {loading && aiResponse === "" ? (
            <div className="w-4 h-4 border-2 border-t-transparent border-[#2d0606]/60 rounded-full animate-spin" />
          ) : (
            <span>{aiResponse}</span>
          )}
        </div>
      </div>
    </>
  );
};

export default Palgakalkulaator;
