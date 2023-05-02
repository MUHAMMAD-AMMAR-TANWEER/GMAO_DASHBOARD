import React, { useContext, useEffect, useState } from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  Legend,
  Category,
  Tooltip,
  ColumnSeries,
  DataLabel,
  StripLine
} from "@syncfusion/ej2-react-charts";

import {
  barCustomSeries,
  barCustomSeries2,
  barPrimaryXAxis,
  barPrimaryYAxis,
} from "../../data/dummy";
import { ChartsHeader } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import axios from "axios";
import loader from "../../images/loader1.jpg"
import { StateContext } from "../../contexts/ContextProvider";

// displaysensorGraphTwo

const Bar2 = () => {

  const { startDate, endDate } = useContext(StateContext);

  const { currentMode } = useStateContext();
  const [barData, setBarData] = useState();
  const [Avg, setAvg] = useState()
  // const [startDate, setStartDate] = useState(false);
  // const [endDate, setEndDate] = useState(false);
  const [displayBtn, setDisplayBtn] = useState(false);
  // const [lineSeries , setLineSeries] = useState(null)

  const BarData = async (startDate, endDate) => {
    const response = await axios.get(
      `http://localhost:8000/displaysensorGraphTwo?startDate=${startDate}&endDate=${endDate}`
    );
    console.log("helloApiResponse => ", response);
    // setBarData(response.data.values)
    console.log("====================================");
    console.log("Faizan khan Zada:", response.data.values);
    console.log("====================================");
    setAvg(parseFloat(response.data.avg).toFixed(2))
    return response.data.values[0];
  };
  
  // const getData = async () => {
  //   if (startDate && endDate) {
  //     let fetchBarData = await BarData(startDate, endDate);
  //     console.log(startDate, endDate, "Faizan");
  //     setBarData(fetchBarData);
      
  //     setDisplayBtn(false);
  //   }
  // };
  const marker = {
    visible: true,
    position: 'Top',
    font: { fontWeight: '600', color: '#ffffff' }
  }

  useEffect( () => {
    (async () => {
      if (startDate && endDate) {
        console.log(startDate, endDate, "console please bar1 ke undr chala");
        // BarData(startDate, endDate)
        let fetchBarData = await BarData(startDate, endDate);
        console.log(startDate, endDate, "Faizan");
        setBarData(fetchBarData);
        setDisplayBtn(false);
      }
    })()
    
  }, [startDate, endDate]);


  return (
    <div>
      <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      
        <ChartsHeader category="Temps moyen de prise en compte ( Sensor )" title={`Moyyene : ${Avg}`} />
        <div className=" w-full">
        {barData ? (
          <ChartComponent
            primaryXAxis={barPrimaryXAxis}
            primaryYAxis={barPrimaryYAxis}
            chartArea={{ border: { width: 0 } }}
            tooltip={{ enable: true }}
            background={currentMode === "Dark" ? "#33373E" : "#fff"}
            legendSettings={{ background: "white" }}
          >
            <Inject
              services={[ColumnSeries, Legend, Tooltip, Category, DataLabel, StripLine]}
            />
            <SeriesCollectionDirective>
              {/* eslint-disable-next-line react/jsx-props-no-spreading */}
              <SeriesDirective dataSource={barData} xName='x' yName='y'  type='Column' marker={marker} >
              </SeriesDirective>
            </SeriesCollectionDirective>
          </ChartComponent>) : (
            <img style={{height: "50px"}} src={loader} alt="loader" />
          )}
        </div>
      </div>

      
    </div>
  );
};

export default Bar2;
