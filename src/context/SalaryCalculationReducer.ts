export interface SalaryCalculationState {
    option: 'bruto' | 'neto' | 'tooandjakulu';
    amount: number;
    isTtMEmployer: boolean;
    isTtMEmployee: boolean;
    isPensionCalculated: 2 | 4 | 6 | false;
  }
  
  export const initialState: SalaryCalculationState = {
    option: 'bruto',
    amount: 0,
    isTtMEmployer: true,
    isTtMEmployee: true,
    isPensionCalculated: 2,
  };
  
  export type SalaryCalculationAction =
    | { type: 'SET_OPTION'; payload: 'bruto' | 'neto' | 'tooandjakulu' }
    | { type: 'SET_AMOUNT'; payload: number }
    | { type: 'TOGGLE_TTM_EMPLOYER' }
    | { type: 'TOGGLE_TTM_EMPLOYEE' }
    | { type: 'SET_PENSION_CALCULATED'; payload: 2 | 4 | 6 | false };
  
  export function salaryCalculationReducer(
    state: SalaryCalculationState,
    action: SalaryCalculationAction
  ): SalaryCalculationState {
    switch (action.type) {
      case 'SET_OPTION':
        return { ...state, option: action.payload };
      case 'SET_AMOUNT':
        return { ...state, amount: action.payload };
      case 'TOGGLE_TTM_EMPLOYER':
        return { ...state, isTtMEmployer: !state.isTtMEmployer };
      case 'TOGGLE_TTM_EMPLOYEE':
        return { ...state, isTtMEmployee: !state.isTtMEmployee };
      case 'SET_PENSION_CALCULATED':
        return { ...state, isPensionCalculated: action.payload };
      default:
        return state;
    }
  }
  