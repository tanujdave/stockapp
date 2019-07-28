import React from "react";
import ReactHighstock from "react-highcharts/ReactHighstock";
import { highchartConfig } from "../config/highchartConfig";

const StockChart = ({ data }) => {
    if (data) {
        highchartConfig.series = [
            {
                name: data.ticker,
                data: data.data,
                tooltip: {
                    valueDecimals: 2
                }
            }
        ];
        return <ReactHighstock config={highchartConfig} />;
    }
};

export default StockChart;
