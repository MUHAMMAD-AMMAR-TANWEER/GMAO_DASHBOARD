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
  Chart,
} from "@syncfusion/ej2-react-charts";
import html2canvas from "html2canvas";
import { LinePrimaryXAxis, LinePrimaryYAxis } from "../../data/dummy";
import { useStateContext, StateContext } from "../../contexts/ContextProvider";
import { ChartsHeader, LineChart } from "../../components";
import loader from "../../images/loader1.jpg";
import { useContext } from "react";
import html2pdf from "html2pdf.js";
import logo from "../../images/Logo_Toulouse.png";

const Line = () => {
  const { line, startDate, endDate, maxValue1 } = useContext(StateContext);
  const { currentMode } = useStateContext();
  const [lineData, setLineData] = useState();

  const marker = { visible: true, width: 10, height: 10 };
  const palette = ["#33FF3F", "#FC3434"];

  useEffect(() => {
    if (line) {
      setLineData(line);
    }
  }, [line]);

  console.log("StartDate", startDate);
  console.log("endDate", endDate);

  const generatePDF = () => {
    const element = document.getElementById("line-chart"); // Replace 'pdf-content' with the ID of the element containing the content you want to convert to PDF
    const opt = {
      margin: [35, 0, 55, 0],
      filename: `${formattedDateStart} - ${formattedDateEnd} Distribution-des-pannes-sur-la-periode.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 1 },
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

  const LinePrimaryYAxisNew = {
    labelFormat: '{value}',
    rangePadding: 'None',
    minimum: 0,
    maximum: maxValue1 ,
    interval: 1,
    lineStyle: { width: 0 },
    majorTickLines: { width: 0 },
    minorTickLines: { width: 0 },
  };

  const captureScreenshot = () => {
    html2canvas(document.body).then((canvas) => {
      // Convert the canvas to a data URL
      const screenshotDataUrl = canvas.toDataURL("image/png");

      // Create a hidden anchor element to trigger the download
      const link = document.createElement("a");
      link.href = screenshotDataUrl;
      link.download = `${formattedDateStart} - ${formattedDateEnd} Distribution-des-pannes-sur-la-periode.png`; // Specify the filename

      // Trigger a click event on the anchor to start the download
      link.click();
    });
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
      onClick={captureScreenshot}
    >
    Download Image
    </button>
    </div>
      <div id="line-chart">
        <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
          <div className="items-center justify-center gap-3 mb-16  mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900">
            <img
              src={logo}
              style={{ height: "75px", width: "95px" }}
              alt="logo"
            />
          </div>
          <ChartsHeader
            category=" nombre de pannes caméras sur la période"
            title=""
          />
          <div className="w-full">
            <LineChart />
          </div>
        </div>
        <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
          <div className="items-center justify-center gap-3 mb-16  mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900">
            <img
              src={logo}
              style={{ height: "75px", width: "95px" }}
              alt="logo"
            />
          </div>
          <ChartsHeader
            category="nombre de pannes equipment sur la période"
            title=""
          />
          <div className="w-full">
            <div>
              {lineData ? (
                <ChartComponent
                  height="420px"
                  primaryXAxis={LinePrimaryXAxis}
                  primaryYAxis={LinePrimaryYAxisNew}
                  palettes={palette}
                  chartArea={{ border: { width: 0 } }}
                  tooltip={{ enable: true }}
                  background={currentMode === "Dark" ? "#33373E" : "#fff"}
                  legendSettings={{ background: "white" }}
                >
                  <Inject
                    services={[
                      LineSeries,
                      DateTime,
                      Legend,
                      Tooltip,
                      ColumnSeries,
                      DateTimeCategory,
                    ]}
                  />
                  <SeriesCollectionDirective>
                    <SeriesDirective
                      dataSource={lineData[0]}
                      xName="x"
                      yName="y"
                      type="Line"
                      width="2"
                      name="tickets Ouverts"
                      marker={marker}
                    ></SeriesDirective>
                    <SeriesDirective
                      dataSource={lineData[1]}
                      xName="x"
                      yName="y"
                      type="Line"
                      width="2"
                      name="ticket fermés"
                      marker={marker}
                    ></SeriesDirective>
                  </SeriesCollectionDirective>
                </ChartComponent>
              ) : (
                <img style={{ height: "50px" }} src={loader} alt="loader" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Line;
