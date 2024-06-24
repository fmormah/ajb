import { InvestmentProvider } from "./context/investmentDiscoveryContext";
import Hero from "./components/Hero/Hero";
import StrategyButton from "./components/StrategyButton/StrategyButton";
import VariationOptions from "./components/VariationOptions/VariationOptions";
import InformationConsole from "./components/InformationConsole/InformationConsole";
import { FUNDS } from "./const";

function App() {
  return (
    <InvestmentProvider>
      <Hero>
        <h2>These are the voyages of the AJ Bell group</h2>
        <h3>
          Its continuing mission: to explore strange new investment
          opportunities; to seek out new funds and bonds; to boldly go where no
          agency has gone before!
        </h3>
      </Hero>
      <main className="content">
        <p className="h1">Explore our strategies</p>
        <section className="strategy-buttons-container">
          {FUNDS.map((fund, index) => (
            <StrategyButton
              key={index}
              strategyName={fund.NAME}
              variations={fund.VARIATIONS.map((variation) => ({
                variationLabel: variation.LABEL,
                fetchURL: variation.FETCH_URL,
              }))}
            />
          ))}
        </section>
        <VariationOptions />
        <InformationConsole />
      </main>
    </InvestmentProvider>
  );
}

export default App;
