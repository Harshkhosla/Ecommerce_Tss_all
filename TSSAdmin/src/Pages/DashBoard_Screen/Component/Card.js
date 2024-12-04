import React from "react";

const Card = ({ title, subtitle, icon, color }) => {
  return (
    <div
      className={`shadow-md rounded-lg px-4 py-5 flex flex-col w-90 h-30 ${color}`}>
      <div className="mb-5">
        <h3 className="text-3xl font-bold">{title}</h3>
      </div>
      <div className="flex justify-between">
        <span className="text-md">{subtitle}</span>
        <img src={icon} alt="icon" className="h-[7vh] w-[7vh]" />
      </div>
    </div>
  );
};

export default Card;
