import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { StrategVariation, Data, defaultEmptyData } from "../types";

// Define the shape of our state
interface State {
  investmentStyle: string;
  fundingOption: string;
  performanceCheckOption: "assets" | "holdings";
  investmentData: Data;
  investmentVariations: StrategVariation[];
  errorLog: string;
}

// Define the types of actions
type Action =
  | { type: "setInvestmentStyle"; payload: string }
  | { type: "setFundingOption"; payload: string }
  | { type: "setPerformanceCheckOption"; payload: "assets" | "holdings" }
  | { type: "setInvestmentVariations"; payload: StrategVariation[] }
  | { type: "setInvestmentData"; payload: Data }
  | { type: "setErrorLog"; payload: string };

// Default state values
const defaultState: State = {
  investmentStyle: "",
  fundingOption: "",
  performanceCheckOption: "assets",
  investmentData: defaultEmptyData,
  investmentVariations: [],
  errorLog: "",
};

// Reducer function to handle state changes
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "setInvestmentStyle":
      return { ...state, investmentStyle: action.payload };
    case "setFundingOption":
      // Setting Session storage to store this data to satisfy test requirments. But I would argue it's not needed
      sessionStorage.setItem(
        "userFundselection.",
        action.payload.toLocaleLowerCase()
      );
      return { ...state, fundingOption: action.payload };
    case "setPerformanceCheckOption":
      return { ...state, performanceCheckOption: action.payload };
    case "setInvestmentData":
      return { ...state, investmentData: action.payload };
    case "setInvestmentVariations":
      return { ...state, investmentVariations: action.payload };
    case "setErrorLog":
      return { ...state, errorLog: action.payload };
    default:
      return state;
  }
};

// Context creation
const InvestmentContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: defaultState,
  dispatch: () => {},
});

// Context provider component
export const InvestmentProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  return (
    <InvestmentContext.Provider value={{ state, dispatch }}>
      {children}
    </InvestmentContext.Provider>
  );
};

// Custom hook to use the investment context
export const useInvestment = () => {
  const context = useContext(InvestmentContext);
  if (!context) {
    throw new Error("useInvestment must be used within an InvestmentProvider");
  }
  return context;
};
