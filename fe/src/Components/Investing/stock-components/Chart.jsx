import React, {  useEffect, useState } from "react";
import {
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Line,
  Legend,
  CartesianGrid,
  LineChart,
} from "recharts";
import { fetchHistoricalData } from "../api/stockApi";

const Chart = ({symbol}) => {
  const [data, setData] = useState([]);

  const formatData = (data) => {
    const timeSeriesData = data['Time Series (Daily)'];
    const transformedData = [];

    for (let date in timeSeriesData) {
      if (timeSeriesData.hasOwnProperty(date)) {
        const dailyData = timeSeriesData[date];
        const utcDate = new Date(`${date} UTC`);
        transformedData.push({
          date: new Date(utcDate.setMinutes(utcDate.getMinutes() + utcDate.getTimezoneOffset())),
          open: parseFloat(dailyData['1. open']),
          high: parseFloat(dailyData['2. high']),
          low: parseFloat(dailyData['3. low']),
          close: parseFloat(dailyData['4. close']),
        });
      }
    }
    return transformedData.sort((a, b) => a.date - b.date);
  };

  useEffect(() => {

    const updateChartData = async () => {
      try {
        const result = await fetchHistoricalData(
          symbol,
        );
        setData(formatData(result));
        console.log(data);
      } catch (error) {
        setData([]);
        console.log(error);
      }
    };

    updateChartData();
  }, [ ]);

  const formatXAxis = (tickItem) => {
    return tickItem.toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric', month: 'short', day: 'numeric',
      hour: 'numeric', minute: 'numeric',
      hour12: false // Use 24-hour format
    });
  };


  return (
    <div style={{ width: '100%', height:'600px' }}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickFormatter={formatXAxis}/>
          <YAxis />
          <Tooltip labelFormatter={(label) => formatXAxis(label)}/>
          <Legend />
          <Line type="monotone" dataKey="open" stroke="#8884d8" />
          <Line type="monotone" dataKey="high" stroke="#82ca9d" />
          <Line type="monotone" dataKey="low" stroke="#ffc658" />
          <Line type="monotone" dataKey="close" stroke="#ff7300" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;