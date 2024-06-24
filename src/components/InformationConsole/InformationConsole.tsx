import React, { ReactNode, useEffect } from "react";
import "./InformationConsole.scss";
import { useInvestment } from "../../context/investmentDiscoveryContext";
import StarRating from "../StarRating/StarRating";
import MeasureBar from "../MeasureBar/MeasureBar";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import cn from "classnames";
import { InformationConsoleProps } from "../../types";
import { stat } from "fs";

ChartJS.register(ArcElement, Tooltip, Legend, Title);
const InformationConsole: React.FC<InformationConsoleProps> = ({
  children,
}) => {
  const { dispatch, state } = useInvestment();

  const { quote, documents, profile, portfolio, ratings } =
    state.investmentData;

  const isDataFromSingleVariation = state.investmentVariations?.length < 2;
  const labels = portfolio.asset.map((asset) => asset.label);
  const values = portfolio.asset.map((asset) => asset.value);

  const totalWeighting = portfolio.top10Holdings
    .reduce((acc, holding) => acc + holding.weighting, 0)
    .toFixed(2);

  const pieData = {
    labels: labels,
    datasets: [
      {
        data: values,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 5,
      },
    ],
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  if (state.errorLog !== "") {
    return (
      <section className={cn("error-section")}>
        <img
          alt="lost astronaut"
          className="lost-astronaut"
          src={`${process.env.PUBLIC_URL}/images/error-helm.png`}
        />
        <p>Oh dear! An error has occured and we're lost in space!</p>
        <p>Error Type: {state.errorLog}</p>
      </section>
    );
  }

  if (state.investmentData.quote?.name === "" && state.fundingOption !== "") {
    return (
      <section className={cn("information-console", "active")}>
        <div className="loading-shimmer" />
        <div className="loading-shimmer p1" />
        <div className="loading-shimmer p2" />
        <div className="loading-shimmer p5" />
        <div className="loading-shimmer p3" />
        <div className="loading-shimmer p4" />
        <div className="loading-shimmer p2" />
        <div className="loading-shimmer p3" />
        <div className="loading-shimmer p5" />
      </section>
    );
  }

  return (
    <section
      className={cn("information-console", {
        "is-sole-variation": isDataFromSingleVariation,
        active: state.fundingOption !== "",
      })}
    >
      <h3> {quote?.name} </h3>

      <div className="doc-container">
        {documents.map((option, index) => (
          <a
            className="a-link"
            target="_blank"
            key={option.id}
            href={option.url}
            rel="noreferrer"
          >
            {option.type}
          </a>
        ))}
      </div>
      <div className="information-console-top">
        <div className="information-console-top-info">
          <h4>What's the Break-Down:</h4>
          <p>{profile.objective}</p>
        </div>
        <div className="information-console-top-info">
          <div className="rating-container">
            <h4>Rating</h4>
            <StarRating rating={ratings.analystRating} />

            <h4>
              Risk Level: <strong>{ratings.analystRatingLabel}</strong>
            </h4>
            {ratings.SRRI && <MeasureBar rating={ratings.SRRI} />}
          </div>
        </div>
      </div>

      <div className="information-console-bottom">
        <div className="information-assets-info">
          <h3>Assets</h3>
          <Doughnut
            data={pieData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: "Portfolio Asset Allocation",
                },
              },
            }}
          />
        </div>
        <div className="information-holding-info">
          <div className="information-holding-info">
            <h3>Holdings</h3>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Holding</th>
                  <th>Weight</th>
                </tr>
              </thead>
              <tbody>
                {portfolio.top10Holdings.map((holding, index) => (
                  <tr key={index}>
                    <td aria-label="Holding">{holding.name}</td>
                    <td aria-label="Weight">{holding.weighting.toFixed(2)}%</td>
                  </tr>
                ))}
                <tr>
                  <td aria-label="Total">
                    <strong>Total</strong>
                  </td>
                  <td>
                    <strong>{totalWeighting}%</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <a
        className="invest-cta"
        href="https://www.ajbell.co.uk/investment-ideas/"
      >
        Let's go for it!
      </a>
    </section>
  );
};

export default InformationConsole;
