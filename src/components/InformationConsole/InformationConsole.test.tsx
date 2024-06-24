import { render, screen } from "@testing-library/react";
import InformationConsole from "./InformationConsole";
import { InvestmentProvider } from "../../context/investmentDiscoveryContext";

test("renders InformationConsole with default data", () => {
  render(
    <InvestmentProvider>
      <InformationConsole />
    </InvestmentProvider>
  );
  expect(screen.getByText("What's the Break-Down:")).toBeInTheDocument();
  expect(screen.getByText("Assets")).toBeInTheDocument();
  expect(screen.getByText("Holdings")).toBeInTheDocument();
});
