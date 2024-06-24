import { render, screen } from "@testing-library/react";
import MeasureBar from "./MeasureBar";

test("renders MeasureBar component", () => {
  render(<MeasureBar rating={5} />);
  const measureBarElement = screen.getByLabelText(
    "This fund has a risk rating of 5 out of 10"
  );
  expect(measureBarElement).toBeInTheDocument();
});

test("only one cell is active for a given rating", () => {
  const rating = 7;
  render(<MeasureBar rating={rating} />);
  const cells = screen.getAllByRole("cell");
  const activeCells = cells.filter((cell) => cell.classList.contains("active"));
  expect(activeCells.length).toBe(1);
  expect(activeCells[0]).toHaveClass(`risk-rating-tool-values--${rating}`);
});

test("ARIA label is set correctly for risk rating", () => {
  const rating = 3;
  render(<MeasureBar rating={rating} />);
  expect(
    screen.getByLabelText(`This fund has a risk rating of ${rating} out of 10`)
  ).toBeInTheDocument();
});
