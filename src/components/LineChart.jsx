import { useEffect, useState } from "react";
import Chart from "react-google-charts";
import PropTypes from "prop-types";

const LineChart = ({ historicalData }) => {
  const [data, setData] = useState([["Date", "Prices"]]);
  const options = {
    title: "past 7 days prices",
    legend: { position: "bottom" },
  };

  useEffect(() => {
    let dataCopy = [["Date", "Prices"]];
    if (historicalData.prices) {
      historicalData.prices.map((item) => {
        dataCopy.push([
          `${new Date(item[0]).toLocaleDateString().slice(0, -5)}`,
          item[1],
        ]);
      });
      setData(dataCopy);
    }
  }, [historicalData]);
  return (
    <Chart
      chartType="LineChart"
      data={data}
      height={"100%"}
      legendToggle
      options={options}
    />
  );
};

LineChart.propTypes = {
  historicalData: PropTypes.object,
};
export default LineChart;
