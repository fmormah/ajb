import React from "react";
import "./StrategyButton.scss";
import { StrategyButtonProps, defaultEmptyData } from "../../types";
import { useInvestment } from "../../context/investmentDiscoveryContext";
import cn from "classnames";

const StrategyButton: React.FC<StrategyButtonProps> = ({
  strategyName,
  variations,
}) => {
  const { dispatch, state } = useInvestment();
  const selectedInvestmentStyle = state.investmentStyle.toLowerCase();
  const componentInvestmentStyle = strategyName.toLowerCase();
  const isActive = selectedInvestmentStyle === componentInvestmentStyle;

  const handleClick = () => {
    dispatch({ type: "setInvestmentStyle", payload: strategyName });
    dispatch({ type: "setInvestmentVariations", payload: variations });
    dispatch({ type: "setInvestmentData", payload: defaultEmptyData });
    dispatch({ type: "setFundingOption", payload: "" });
    dispatch({ type: "setErrorLog", payload: "" });
  };

  return (
    <button
      className={cn(
        "strategy-buttons",
        `strategy-${componentInvestmentStyle.replace(/ /g, "-")}`,
        {
          active: isActive,
        }
      )}
      onClick={handleClick}
    >
      {strategyName}
    </button>
  );
};

export default StrategyButton;
