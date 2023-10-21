import React, { useContext } from "react";
import { useStateContext, StateContext } from "../contexts/ContextProvider";
import logo from "../images/Logo_Toulouse.png";
import loader from "../images/loader1.jpg";
import html2pdf from "html2pdf.js";

const DataComponent = () => {
  const { horizontalbar2, xyValues, xyValues2, startDate, endDate } =
    useContext(StateContext);

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
      <div id="bar-charts" className="flex items-center text-left justify-center flex-col">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780">
          <div className="items-center justify-center gap-3 mb-16  mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900">
            <img
              src={logo}
              style={{ height: "75px", width: "95px" }}
              alt="logo"
            />
          </div>
          <div className="dark:text-gray-200  font-semibold text-xl mb-3 ">
            <h1>Distribution des pannes caméras par type</h1>
          </div>
          <div className="flex flex-col items-center justify-center">
            {xyValues ? (
              <div className="flex lg:flex-nowrap justify-center ">
                {xyValues?.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-32  p-3 pt-9 rounded-2xl "
                  >
                    <div className="text-sm opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl">
                      {item.x}
                    </div>
                    <div className="mt-3">
                      <strong className=" flex justify-center text-xl font-bold">
                        {item.y}
                      </strong>{" "}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <img
                className="flex justify-center items-center h-52 mt-10 mb-6  "
                style={{ height: "50px" }}
                src={loader}
                alt="loader"
              />
            )}
          </div>

          <div className="dark:text-gray-200  font-semibold text-xl mb-3 mt-10 ">
            <h1>Distribution des pannes caméras par type</h1>
          </div>
          <div className="flex flex-col items-center justify-center">
            {xyValues2 ? (
              <div className="flex lg:flex-nowrap justify-center ">
                {xyValues2?.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl "
                  >
                    <div className="text-md opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl">
                      {item.x}
                    </div>
                    <div className="mt-3">
                      <strong className=" flex justify-center text-xl font-bold">
                        {item.y}
                      </strong>{" "}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <img
                className="flex justify-center items-center h-52 mt-10 mb-6  "
                style={{ height: "50px" }}
                src={loader}
                alt="loader"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataComponent;
