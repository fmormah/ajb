import React, { useState, useEffect, useCallback } from "react";
import "./VariationOptions.scss";
import { useInvestment } from "../../context/investmentDiscoveryContext";
import { StrategVariation } from "../../types";
import cn from "classnames";

const VariationOptions: React.FC = () => {
  const { dispatch, state } = useInvestment();
  const [isActive, setIsActive] = useState<boolean>(false);

  const fetchData = useCallback(
    async (url: string, label: string) => {
      dispatch({ type: "setFundingOption", payload: label });
      setTimeout(() => {
        document.querySelector(".information-console")?.scrollIntoView({
          behavior: "smooth",
        });
      }, 150);
      try {
        const response = await fetch(
          `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`
        );
        const jsonDataP = await response.json();
        const data = JSON.parse(jsonDataP.contents).data;
        dispatch({ type: "setInvestmentData", payload: data });
      } catch (error) {
        console.error("Error fetching data:", error);
        dispatch({ type: "setErrorLog", payload: "Error Fetching Data" });
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (state.investmentVariations.length === 1) {
      setIsActive(false);
      const { fetchURL, variationLabel } = state.investmentVariations[0];
      fetchData(fetchURL, variationLabel);
    } else {
      setIsActive(true);
    }
  }, [fetchData, state.investmentVariations]);

  const handleClick = (option: StrategVariation) => {
    dispatch({ type: "setErrorLog", payload: "" });
    dispatch({ type: "setFundingOption", payload: "" });
    fetchData(option.fetchURL, option.variationLabel);
  };

  return (
    <section
      className={cn("variation-options-container", { active: isActive })}
    >
      {state.investmentVariations.map((option, index) => (
        <button
          className={cn(
            `fund-option-${option.variationLabel
              .toLocaleLowerCase()
              .replace(/ /g, "-")}`,
            {
              active:
                option.variationLabel.toLocaleLowerCase() ===
                state.fundingOption.toLocaleLowerCase(),
            }
          )}
          onClick={() => handleClick(option)}
          key={index}
        >
          {option.variationLabel}
        </button>
      ))}
    </section>
  );
};

export default VariationOptions;
