import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";

const data = {
  labels: ["Today", "Yesterday", "Tomorrow", "Last Month"],
  datasets: [
    {
      data: [60, 25, 10, 10],
      backgroundColor: ["#A060FC", "#FF8D39", "#c93a0e", "#5BC3F5"],
      hoverBackgroundColor: ["#A060FC", "#FF8D39", "#c93a0e", "#5BC3F5"],
    },
  ],
};

ChartJS.register(ArcElement, Tooltip);

const Chart = ({ heading, fields }) => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="w-full md:w-1/2 rounded-lg p-5 shadow-md sm:w-1/2 h-full text-center border-2">
      <div className="flex flex-row justify-between">
        <h2 className="text-xl font-bold text-gray-500">{heading}</h2>
        <p className="text-sm text-gray-500">
          {date}
          {"  "}
          {currentTime}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row justify-center pl-5 pr-5 items-center pt-5 ">
        <div className="flex justify-between items-center gap-5  w-full h-80">
          <div>
            <Pie data={data} options={options} />
          </div>
          <div>
            <ul className="list-disc text-left pr-10">
              <li className="text-[#A060FC] mb-3">Today</li>
              <li className="text-[#FF8D39] mb-3">Yesterday</li>
              <li className="text-[#c93a0e] mb-3">Tomorrow</li>
              <li className="text-[#5BC3F5]">Last Month</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full mt-4">
        {fields.map((field, index) => (
          <React.Fragment key={index}>
            <div className="flex justify-between">
              <div className="text-gray-500">{field.name}</div>
              <div className="text-gray-500">{field.value}</div>
            </div>
            <div className="w-full mb-5 h-2 bg-gray-300 rounded-full">
              <div
                className={`h-full  rounded-full ${
                  index === 0
                    ? "bg-[#A060FC]"
                    : index === 1
                    ? "bg-[#FF8D39]"
                    : index === 2
                    ? "bg-[#c93a0e]"
                    : "bg-[#5BC3F5]"
                }`}
                style={{ width: `${field.value}%` }}
              />
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Chart;
