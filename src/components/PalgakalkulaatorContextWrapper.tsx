'use client';
import Palgakalkulaator from "./Palgakalkulaator";

import { SalaryCalculationProvider } from "@/context/SalaryCalculatorContext";


const PalgakalkulaatorContextWrapper = () => {

    return (
        <SalaryCalculationProvider>
            <Palgakalkulaator/>
        </SalaryCalculationProvider>
    );
};

export default PalgakalkulaatorContextWrapper;