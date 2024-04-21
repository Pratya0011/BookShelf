import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
import "../Style/Iconstyle.css";

function RatingIcon({ stars, size }) {
  const ratingStar = Array.from({ length: 5 }, (ele, index) => {
    let number = index + 0.5;

    return (
      <React.Fragment key={index}>
        {stars >= index + 1 ? (
          <FaStar className="icon" size={size} />
        ) : stars >= number ? (
          <FaStarHalfAlt className="icon" size={size} />
        ) : (
          <AiOutlineStar className="icon" size={size} />
        )}
      </React.Fragment>
    );
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      {ratingStar}
    </div>
  );
}

export default RatingIcon;
