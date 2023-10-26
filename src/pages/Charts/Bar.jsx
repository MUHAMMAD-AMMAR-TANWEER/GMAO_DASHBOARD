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
import html2canvas from "html2canvas";

import { barPrimaryXAxis, barPrimaryYAxis } from "../../data/dummy";
import { ChartsHeader } from "../../components";
import { useStateContext, StateContext } from "../../contexts/ContextProvider";
import Bar2 from "./Bar2";
import Bar3 from "./Bar3";
import Bar4 from "./Bar4";
import loader from "../../images/loader1.jpg";
import html2pdf from "html2pdf.js";
import logo from "../../images/Logo_Toulouse.png";

const Bar = () => {
  const { bar1, avg1, startDate, endDate } = useContext(StateContext);
  const { currentMode } = useStateContext();
  const [barData, setBarData] = useState();

  const marker = {
    dataLabel: {
      visible: true,
      font: { fontWeight: "800", fontSize: "15px" },
    },
  };

  useEffect(() => {
    if (bar1) {
      setBarData(bar1);
    }
  }, [bar1]);

  const generatePDF = () => {
    const element = document.getElementById("vertical-bar-charts"); // Replace 'pdf-content' with the ID of the element containing the content you want to convert to PDF
    const opt = {
      margin: [7, 0, 60, 0],
      filename: `${formattedDateStart} - ${formattedDateEnd} Temps-de-reponses.pdf`,
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

  // const filteredData = barData?.filter((point) => point.y !== 0);

  const captureScreenshot = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      html2canvas(section).then((canvas) => {
        // Convert the canvas to a data URL
        const screenshotDataUrl = canvas.toDataURL("image/png");

        // Create a hidden anchor element to trigger the download
        const link = document.createElement("a");
        link.href = screenshotDataUrl;
        link.download = `${formattedDateStart} - ${formattedDateEnd} ${sectionId}.png`; // Specify the filename

        // Trigger a click event on the anchor to start the download
        link.click();
      });
    }
  };

  return (
    <div>
      <div className="flex">
        <button
          className=" absolute top-0 right-0 transform -translate-x-1/2 mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={generatePDF}
        >
          Générer PDF
        </button>
        <button
          className=" absolute top-0 right-32 transform -translate-x-1/2 mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => {
            captureScreenshot("Temps moyen de resolution ( Caméras )"),
              captureScreenshot("Temps moyen de prise en compte (Caméras)");
              captureScreenshot("Temps moyen de resolution ( équipements )");
              captureScreenshot("Temps moyen de prise en compte ( équipements )");
          }}
        >
          Download Image
        </button>
        
      </div>
      <div id="vertical-bar-charts">
        <div id="Temps moyen de resolution ( Caméras )" className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
          <div className="items-center justify-center gap-3 mb-16  mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900">
            <img
              src={logo}
              style={{ height: "75px", width: "95px" }}
              alt="logo"
            />
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
        <div id="Temps moyen de prise en compte (Caméras)">
          <Bar2 />
        </div>
        <div id="Temps moyen de resolution ( équipements )">
          <Bar3 />
        </div>
        <div id="Temps moyen de prise en compte ( équipements )">
          <Bar4 />
        </div>
      </div>
    </div>
  );
};

export default Bar;
