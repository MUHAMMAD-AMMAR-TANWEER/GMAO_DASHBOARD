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
  StripLine,
} from "@syncfusion/ej2-react-charts";

import { barPrimaryXAxis, barPrimaryYAxis } from "../../data/dummy";
import { ChartsHeader } from "../../components";
import { useStateContext, StateContext } from "../../contexts/ContextProvider";
import Bar2 from "./Bar2";
import Bar3 from "./Bar3";
import Bar4 from "./Bar4";
import loader from "../../images/loader1.jpg";
import html2pdf from "html2pdf.js";
import { SiShopware } from "react-icons/si";
const Bar = () => {
  const { bar1, avg1 } = useContext(StateContext);
  const { currentMode } = useStateContext();
  const [barData, setBarData] = useState();

  const marker = {
    visible: true,
    position: "Top",
    font: { fontWeight: "600", color: "#ffffff" },
  };

  useEffect(() => {
    if (bar1) {
      setBarData(bar1);
    }
  }, [bar1]);

  const generatePDF = () => {
    const element = document.getElementById("vertical-bar-charts"); // Replace 'pdf-content' with the ID of the element containing the content you want to convert to PDF
    const opt = {
      margin: [15,0,70,0],
      filename: "verticalbar-document.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a3", orientation: "landscape" }, // Set orientation to 'landscape'
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
      <div id="vertical-bar-charts">
        <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
        <div className="items-center justify-center gap-3 mb-16  mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900">
            <SiShopware size={30}/> <span className="text-2xl">GMAO</span>

          </div>
          <ChartsHeader
            category=" Temps moyen de resolution ( Caméras  )"
            title={`Moyenne : ${avg1}(h)`}
          />
          <div className=" w-full">
            {barData ? (
              <ChartComponent
                primaryXAxis={barPrimaryXAxis}
                primaryYAxis={{
                  stripLines: [
                    { start: 7, end: 8, color: "red", visible: true },
                  ],
                  title: "Heures",
                }}
                chartArea={{ border: { width: 0 } }}
                tooltip={{ enable: true }}
                background={currentMode === "Dark" ? "#33373E" : "#fff"}
                legendSettings={{ background: "white" }}
              >
                <Inject
                  services={[
                    ColumnSeries,
                    Legend,
                    Tooltip,
                    Category,
                    DataLabel,
                    StripLine,
                  ]}
                />

                <SeriesCollectionDirective>
                  <SeriesDirective
                    dataSource={barData}
                    xName="x"
                    yName="y"
                    type="Column"
                    marker={marker}
                  ></SeriesDirective>
                </SeriesCollectionDirective>
              </ChartComponent>
            ) : (
              <img style={{ height: "50px" }} src={loader} alt="loader" />
            )}
          </div>
        </div>
        <Bar2 />
        <Bar3 />
        <Bar4 />
      </div>
    </div>
  );
};

export default Bar;
