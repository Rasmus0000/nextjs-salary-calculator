import React, { createContext, useReducer, ReactNode } from 'react';
import { salaryCalculationReducer, initialState, SalaryCalculationState, SalaryCalculationAction } from './SalaryCalculationReducer';

interface SalaryCalculationProviderProps {
  children: ReactNode;
}

export const SalaryCalculationContext = createContext<{
  state: SalaryCalculationState;
  dispatch: React.Dispatch<SalaryCalculationAction>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

export const SalaryCalculationProvider: React.FC<SalaryCalculationProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(salaryCalculationReducer, initialState);

  return (
    <SalaryCalculationContext.Provider value={{ state, dispatch }}>
      {children}
    </SalaryCalculationContext.Provider>
  );
};
