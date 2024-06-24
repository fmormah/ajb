import { render, screen } from "@testing-library/react";
import StrategyButton from "./StrategyButton";
import { InvestmentProvider } from "../../context/investmentDiscoveryContext";

test("renders StrategyButton with strategy name", () => {
  render(
    <InvestmentProvider>
      <StrategyButton strategyName="Growth" variations={[]} />
    </InvestmentProvider>
  );
  expect(screen.getByText("Growth")).toBeInTheDocument();
});

test("class names are correctly assigned based on strategy name", () => {
  const strategyName = "Balanced Approach";
  render(
    <InvestmentProvider>
      <StrategyButton strategyName={strategyName} variations={[]} />
    </InvestmentProvider>
  );
  const expectedClassName = `strategy-${strategyName
    .toLowerCase()
    .replace(/ /g, "-")}`;
  expect(screen.getByRole("button", { name: strategyName })).toHaveClass(
    expectedClassName
  );
});
