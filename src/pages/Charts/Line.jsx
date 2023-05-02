import React, { useEffect, useState } from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  LineSeries,
  DateTime,
  Legend,
  Tooltip,
  ColumnSeries, 
  DateTimeCategory,
  Chart
} from "@syncfusion/ej2-react-charts";

import axios from "axios";
import { LinePrimaryXAxis, LinePrimaryYAxis } from "../../data/dummy";
import { useStateContext } from "../../contexts/ContextProvider";
import { ChartsHeader, LineChart } from "../../components";
import loader from "../../images/loader1.jpg"
import { useContext } from "react";
import { StateContext } from "../../contexts/ContextProvider";

const Line = () => {

  const { startDate, endDate } = useContext(StateContext);

  const { currentMode } = useStateContext();
  const [lineData, setLineData] = useState();
  const [Avg, setAvg] = useState()
  // const [startDate, setStartDate] = useState(false);
  // const [endDate, setEndDate] = useState(false);
  const [displayBtn, setDisplayBtn] = useState(false);
  // const [lineSeries , setLineSeries] = useState(null)
  
  // displayequipmentTicketOpen

  const LineData = async (startDate, endDate) => {
    const response = await axios.get(
      `http://localhost:8000/displayequipmentTicketOpen?startDate=${startDate}&endDate=${endDate}`
    );
    console.log("helloApiResponse => ", response);
    // setBarData(response.data.values)
    console.log("====================================");
    console.log("Faizan khan Zada:", response.data);
    console.log("====================================");
    // setAvg(parseFloat(response.data.avg).toFixed(2))
    return (response.data[0], response.data[1]);
  };

  // const getData = async () => {
  //   if (startDate && endDate) {
  //     let fetchBarData = await LineData(startDate, endDate);
  //     console.log(startDate, endDate, "Faizan");
  //     setLineData(fetchBarData);
  //     setDisplayBtn(false);
  //   }
  // };

  // useEffect(() => {
  //   LineData()
  //     .then((response) => {
  //       const data = [
  //         {
  //           dataSource: response.data[0],
  //           xName: "x",
  //           yName: "y",
  //           name: "Close",
  //           width: "2",
  //           marker: { visible: true, width: 10, height: 10 },
  //           type: "Line",
  //         },

  //         {
  //           dataSource: response.data[1],
  //           xName: "x",
  //           yName: "y",
  //           name: "Open",
  //           width: "2",
  //           marker: { visible: true, width: 10, height: 10 },
  //           type: "Line",
  //         },
  //       ];

  //       setLineData(data);

  //       console.log(response.data[0]);
  //       console.log(response.data[1]);
  //     })

  //     .catch((error) => console.log(error));
  // }, []);
  const marker = { visible: true, width: 10, height: 10 }
  const palette = ["#E94649", "#F6B53F", "#6FAAB0", "#C4C24A"];

  useEffect( () => {
    (async () => {
      if (startDate && endDate) {
        console.log(startDate, endDate, "console please bar1 ke undr chala");
        // BarData(startDate, endDate)
        let fetchBarData = await LineData(startDate, endDate);
        console.log(startDate, endDate, "Faizan");
        setLineData(fetchBarData);
        setDisplayBtn(false);
      }
    })()
    
  }, [startDate, endDate]);


  return (
    <div>
      <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
        <ChartsHeader category="Distribution sur 30j du nb pannes ( Sensor )" title="Distribution sur 30j du nb pannes" />
        <div className="w-full">
          <LineChart />
        </div>
      </div>
      <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      
        <ChartsHeader category="Distribution sur 30j du nb pannes ( Equipement )" title="Distribution sur 30j du nb pannes" />
        <div className="w-full">
          <div>
            {lineData ? (
              <ChartComponent
                height="420px"
                primaryXAxis={LinePrimaryXAxis}
                primaryYAxis={LinePrimaryYAxis}
                palettes={palette}
                chartArea={{ border: { width: 0 } }}
                tooltip={{ enable: true }}
                background={currentMode === "Dark" ? "#33373E" : "#fff"}
                legendSettings={{ background: "white" }}
              >
                <Inject services={[LineSeries, DateTime, Legend, Tooltip, ColumnSeries, DateTimeCategory]} />
                <SeriesCollectionDirective>
                  {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                  <SeriesDirective dataSource={lineData} xName='x' yName='y'  type='Line' width="2" marker={marker} >
                  </SeriesDirective>
                </SeriesCollectionDirective>
              </ChartComponent>
            ) : (
              <img style={{height: "50px"}} src={loader} alt="loader" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Line;
