import React from "react";

const Status = ({ value }) => {
  let textColor;
  switch (value) {
    case "Solved":
      textColor = "text-green-500";
      break;
    case "Pending":
      textColor = "text-red-500";
      break;
    default:
      textColor = "text-black";
      break;
  }

  return <span className={textColor}>{value}</span>;
};

export default Status;
