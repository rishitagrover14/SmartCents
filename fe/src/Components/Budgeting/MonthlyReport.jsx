import React, { useEffect, useState } from "react";
import { BarChart, PieChart } from "@mui/x-charts";
import NavBlack from "../navbarBlack/NavBlack";
import './monthlyReport.css'
import { barElementClasses } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { width } from "@mui/system";

const MonthlyReport = () => {
  const [wantData, setWantData] = useState([]);
  const [necessityData, setNecessityData] = useState([]);
  const [savingsData, setSavingsData] = useState([]);
  const [error, setError] = useState("");
  const labels = ['Jan','Feb','March','April','May','June','July','Aug','Sept','Oct','November','December'];

let currentMonthIndex = new Date().getMonth(); // June is 5 (0-indexed)
const lData = [3500,3500,4000,2500,3000,savingsData?.savings,0,0,0,0,0,0];
const rData = [2500,3000,3000,2000,2000,savingsData?.currentSavings,0,0,0,0,0,0];



const colors = ['#02B2AF', '#2E96FF'];


  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const token = sessionStorage.getItem("token");

        const response = await fetch(
          "http://localhost:4000/api/v1/categories",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();

        const wantCategories = data?.categories?.filter(
          (item) => item?.type === "Want"
        );
        const necessityCategories = data.categories.filter(
          (item) => item?.type === "Necessity"
        );

        const formattedWantData = wantCategories?.map((item, index) => ({
          id: index,
          value: item?.amount,
          label: item?.name,
        }));

        const formattedNecessityData = necessityCategories?.map(
          (item, index) => ({
            id: index,
            value: item?.amount,
            label: item?.name,
          })
        );

        setWantData(formattedWantData);
        setNecessityData(formattedNecessityData);
      } catch (error) {
        console.error("API call error:", error);
        setError("Failed to fetch chart data. Please try again.");
      }
    };

    const fetchSavingsData = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await fetch(
          "http://localhost:4000/api/v1/getSavings",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setSavingsData(data);
      } catch (error) {
        console.error("API call error:", error);
        setError("Failed to fetch savings data. Please try again.");
      }
    };

    fetchSavingsData();
    fetchChartData();
  }, []);

  const maxSavings = Math.max(savingsData.savings, savingsData.currentSavings);
  const tickIncrement = 1000;

  const tickValues = Array.from(
    { length: Math.ceil(maxSavings / tickIncrement) + 1 },
    (_, i) => i * tickIncrement
  );

  return (
    <>
      <NavBlack />
      <div className="top">
      <div className="bars">
      <h3>Savings</h3><br/>
      <BarChart 
  sx={(theme) => ({
    [`.MuiBarElement-series-l_id`]: {
      stroke: colors[0],
    },
    [`.MuiBarElement-series-r_id`]: {
      stroke: colors[1],
    },
    [`.${axisClasses.root}`]: {
      [`.${axisClasses.tick}, .${axisClasses.line}`]: {
        stroke: '#006BD6',
        strokeWidth: 1,
      },
      [`.${axisClasses.tickLabel}`]: {
        fill: '#006BD6',
      },
    },
    border: `1px solid rgba(${theme.palette.mode === 'dark' ? '255,255,255' : '0, 0, 0'}, 0.1)`,
  })}
  xAxis={[{ scaleType: 'band', data: labels }]}
  series={[
    { data: lData, label: 'Recommended Savings    ', id: 'l_id' },
    { data: rData, label: 'Current Savings', id: 'r_id' },
  ]}
  colors={colors}
  width={1000}
  height={300}
      
/></div>
        <div className="charts">
        <div>
         <h3>Wants</h3>
       <PieChart
         series={[
           {
             data: wantData,
           },
         ]}
         width={600}
         height={200}
       />
     </div>
         <div>
         <h3>Necessities</h3>
          <PieChart
            series={[
              {
                data: necessityData,
              },
            ]}
            width={600}
            height={200}
          /></div>
        </div>
       
          
        </div>
      
    </>
  );
};

export default MonthlyReport;