import React, { useEffect, useState } from "react";
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
  BarSeries,
} from "@syncfusion/ej2-react-charts";

import {
  barCustomSeries,
  barCustomSeries2,
  barPrimaryXAxis,
  barPrimaryYAxis,
} from "../../data/dummy";
import { ChartsHeader } from "..";
import { useStateContext } from "../../contexts/ContextProvider";
import axios from "axios";
import loader from "../../images/loader1.jpg";
import { StateContext } from "../../contexts/ContextProvider";
import { useContext } from "react";


const BarData = async (startDate, endDate) => {
  const response = await axios.get(
    `http://localhost:8000/displayequipmentFailure?startDate=${startDate}&endDate=${endDate}`
  );
  console.log("helloApiResponse => ", response);
  // setBarData(response.data.values)
  console.log("====================================");
  console.log("Faizan khan Zada:", response.data.values);
  console.log("====================================");
  return response.data.values;
};

const Bar2 = () => {

  const { startDate, endDate } = useContext(StateContext);

  const { currentMode } = useStateContext();
  const [barData, setBarData] = useState(false);
  // const [startDate, setStartDate] = useState(false);
  // const [endDate, setEndDate] = useState(false);
  const [displayBtn, setDisplayBtn] = useState(false);
  // const [lineSeries , setLineSeries] = useState(null)

  // {
  //   startDate && endDate ? BarData(startDate, endDate) : null;
  // }

  // const getData = async () => {
  //   if (startDate && endDate) {
  //     let fetchBarData = await BarData(startDate, endDate);
  //     console.log(startDate, endDate, "Faizan");
  //     setBarData(fetchBarData);
  //     setDisplayBtn(false);
  //   }
  // };
  // useEffect(async () => {
  // BarData()
  //   .then((response) => {
  //     setBarData(response.data.values);
  //   })

  //   .catch((error) => console.log(error));

  // }, [startDate, endDate]);
  // console.log("====================================");
  // console.log(startDate);
  // console.log("====================================");
  //   let data = [{ x: 'Jan', y: 50 }, { x: 'Feb', y: 57 }, { x: 'Mar', y: 48 }, { x: 'Apr', y: 60 },
  // { x: 'May', y: 70 }, { x: 'Jun', y: 48 }];

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
      
        <ChartsHeader category="Distibution des Pannes Declarees par type" title="Olympic Medal Counts - RIO" />
        <div className=" w-full">
          {barData ? (
            <ChartComponent
              primaryXAxis={{
                valueType: "Category",
                title: "",
              }}
              primaryYAxis={{
                title: "",
              }}
            >
              <Inject services={[BarSeries, Category]} />
              <SeriesCollectionDirective>
                <SeriesDirective
                  dataSource={barData}
                  xName="x"
                  yName="y"
                  type="Bar"
                ></SeriesDirective>
              </SeriesCollectionDirective>
            </ChartComponent>
          ) : (
            <img style={{ height: "50px" }} src={loader} alt="loader" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Bar2;
