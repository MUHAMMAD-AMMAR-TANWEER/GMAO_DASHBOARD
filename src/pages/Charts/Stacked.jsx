import React, { useEffect, useState, useContext } from "react";
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
import { useStateContext, StateContext } from "../../contexts/ContextProvider";
import loader from "../../images/loader1.jpg";
import { ChartsHeader, Stacked as StackedChart } from "../../components";
import CreatePDFButton from "../../components/pdfButton";
import html2pdf from "html2pdf.js";
import logo from "../../images/Logo_Toulouse.png"
// const BarData = async (startDate, endDate) => {
//   const response = await axios.get(
//     `https://sippro-gmao.fr:8443/displaysensorFailure?startDate=${startDate}&endDate=${endDate}`
//   );
//   return response.data.values;
// };

const Stacked = () => {
  const { horizontalbar2, startDate, endDate } = useContext(StateContext);
  const [barData, setBarData] = useState();

  useEffect(() => {
    if (horizontalbar2) {
      setBarData(horizontalbar2);
    }
  }, [horizontalbar2]);

  const generatePDF = () => {
    const element = document.getElementById("bar-charts"); // Replace 'pdf-content' with the ID of the element containing the content you want to convert to PDF
    const opt = {
      margin: [20, 0, 55, 0],
      filename: `${formattedDateStart} - ${formattedDateEnd} Distribution-des-pannes-par-type.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a3", orientation: "landscape" }, // Set orientation to 'landscape'
    };

    html2pdf().from(element).set(opt).save();
  };

  const dateObjectStart = new Date(startDate);
  const dateObjectEnd = new Date(endDate);


  const month1 = dateObjectStart.toLocaleString("en-US", { month: "short" });
  const day1 = dateObjectStart.getDate();
  const year1 = dateObjectStart.getFullYear();

  
  const month2 = dateObjectEnd.toLocaleString("en-US", { month: "short" });
  const day2 = dateObjectEnd.getDate();
  const year2 = dateObjectEnd.getFullYear();
  
  const formattedDateStart = `${day1} ${month1} ${year1}`;
  const formattedDateEnd = `${day2} ${month2} ${year2}`;

  return (
    <div>
      <button
        className=" absolute top-0 right-0 transform -translate-x-1/2 mt-2 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={generatePDF}
      >
      Générer PDF
      </button>
      <div id="bar-charts">
        <div id="bar-charts" className="w-full">
          <StackedChart />
        </div>
        <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
          <div className="items-center justify-center gap-3 mb-16  mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900">
          <img src={logo} style={{height:"75px", width:"95px"}} alt="logo"/>
          </div>
          <ChartsHeader category=" pannes équipements par type" />

          <div className=" w-full">
            {barData ? (
              <div>
                <ChartComponent
                  primaryXAxis={{
                    valueType: "Category",
                    title: "",
                  }}
                  primaryYAxis={{
                    title: "",
                  }}
                >
                  <Inject services={[BarSeries, Category, DataLabel]} />
                  <SeriesCollectionDirective>
                    <SeriesDirective
                      dataSource={barData}
                      xName="x"
                      yName="y"
                      type="Bar"
                      marker={{ dataLabel: { visible: true } }}
                    ></SeriesDirective>
                  </SeriesCollectionDirective>
                </ChartComponent>
              </div>
            ) : (
              <img style={{ height: "50px" }} src={loader} alt="loader" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stacked;
