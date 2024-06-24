import React from "react";
import "./StarRating.scss";
import cn from "classnames";
import { StarRatingProps } from "../../types";

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  highestPossibleRating = 5,
}) => {
  const stars = Array.from({ length: highestPossibleRating }, (_, index) => (
    <span
      key={index}
      className={cn("rating-star", {
        filled: index < rating,
        empty: index >= rating,
      })}
    >
      ★
    </span>
  ));

  return (
    <div
      aria-label={`This fund has a star rating of ${stars}`}
      className="rating-component"
    >
      {stars}
    </div>
  );
};

export default StarRating;
