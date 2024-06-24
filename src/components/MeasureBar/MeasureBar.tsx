import React from "react";
import "./MeasureBar.scss";
import cn from "classnames";
import { MeasureBarProps } from "../../types";

const MeasureBar: React.FC<MeasureBarProps> = ({ rating }) => {
  return (
    <div className="risk-rating-component">
      <table
        className="risk-rating-tool"
        aria-label={`This fund has a risk rating of ${rating} out of 10`}
      >
        <tbody>
          <tr className="risk-rating-tool-values">
            {Array.from({ length: 10 }, (_, index) => (
              <td
                key={index + 1}
                className={cn(`risk-rating-tool-values--${index + 1}`, {
                  active: rating === index + 1,
                })}
              ></td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MeasureBar;
