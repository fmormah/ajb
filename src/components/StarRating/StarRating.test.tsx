import { render, screen } from "@testing-library/react";
import StarRating from "./StarRating";

test("renders StarRating with default highestPossibleRating", () => {
  render(<StarRating rating={3} />);
  const stars = screen.getAllByText("★");
  expect(stars.length).toBe(5); // Default highestPossibleRating is 5
});

test("displays correct number of filled stars", () => {
  const rating = 3;
  render(<StarRating rating={rating} />);
  const filledStars = screen.getAllByText("★", { selector: ".filled" });
  expect(filledStars.length).toBe(rating);
});

test("displays correct number of empty stars", () => {
  const rating = 2;
  render(<StarRating rating={rating} />);
  const emptyStars = screen.getAllByText("★", { selector: ".empty" });
  expect(emptyStars.length).toBe(5 - rating); // Default highestPossibleRating is 5
});

test("renders with custom highest possible rating", () => {
  const rating = 4;
  const highestPossibleRating = 10;
  render(
    <StarRating rating={rating} highestPossibleRating={highestPossibleRating} />
  );
  const stars = screen.getAllByText("★");
  expect(stars.length).toBe(highestPossibleRating);
  const filledStars = screen.getAllByText("★", { selector: ".filled" });
  expect(filledStars.length).toBe(rating);
});
