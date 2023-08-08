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
// const BarData = async (startDate, endDate) => {
//   const response = await axios.get(
//     `https://sippro-gmao.fr:8443/displaysensorFailure?startDate=${startDate}&endDate=${endDate}`
//   );
//   return response.data.values;
// };

const Stacked = () => {
  const { horizontalbar2 } = useContext(StateContext);
  const [barData, setBarData] = useState();

  useEffect(() => {
    if (horizontalbar2) {
      setBarData(horizontalbar2);
    }
  }, [horizontalbar2]);

  const generatePDF = () => {
    const element = document.getElementById("bar-charts"); // Replace 'pdf-content' with the ID of the element containing the content you want to convert to PDF
    const opt = {
      margin: 10,
      filename: "converted-document.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "landscape" }, // Set orientation to 'landscape'
    };

    html2pdf().from(element).set(opt).save();
  };

  return (
    <div>
      <button
        className=" absolute top-0 right-0 transform -translate-x-1/2 mt-2 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={generatePDF}
      >
        Generate PDF
      </button>
      <div id="bar-charts">
        <div id="bar-charts" className="w-full">
          <StackedChart />
        </div>
        <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
          <ChartsHeader category="Distribution des pannes équipements par type" />

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
