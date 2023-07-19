import React, { useState } from "react";
import { GoPrimitiveDot } from "react-icons/go";
import { IoIosMore } from "react-icons/io";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { useNavigate } from "react-router-dom";
import { Stacked, Pie, Button, LineChart, SparkLine } from "../components";
import {
  medicalproBranding,
  recentTransactions,
  weeklyStats,
  dropdownData,
  SparklineAreaData,
  ecomPieChartData,
} from "../data/dummy";
import { useStateContext, StateContext } from "../contexts/ContextProvider";
import product9 from "../data/product9.jpg";
import { useContext } from "react";
import loader from "../images/loader1.jpg";
import PDFDocument from "../components/pdfButton";
import html2pdf from "html2pdf.js";
const DropDown = ({ currentMode }) => (
  <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
    <DropDownListComponent
      id="time"
      fields={{ text: "Time", value: "Id" }}
      style={{ border: "none", color: currentMode === "Dark" && "white" }}
      value="1"
      dataSource={dropdownData}
      popupHeight="220px"
      popupWidth="120px"
    />
  </div>
);

const Ecommerce = () => {
  const { currentColor, currentMode } = useStateContext();
  const {
    completeData,
    remainingData,
    totalData,
    completeData2,
    remainingData2,
    totalData2,
    snefData,
    sipproData,
    mairieData,
    snefData2,
    sipproData2,
    mairieData2,
    startDate,
    endDate,
    maintenanceZefilData,
    maintenanceZefilData2,
  } = useContext(StateContext);



   const isNumbermaintenanceZefilData = maintenanceZefilData >= 0 && maintenanceZefilData !== null

   const isNumbercompleteData = completeData >= 0 && completeData !== null
   const isNumberremainingData = remainingData >= 0 && remainingData !== null
   const isNumbertotalData = totalData >= 0 && totalData !== null
   const isNumbercompleteData2 = completeData2 >= 0 && completeData2 !== null
   const isNumberremainingData2 = remainingData2 >= 0 && remainingData2 !== null
   const isNumbertotalData2 = totalData2 >= 0 && totalData2 !== null
   const isNumbersnefData = snefData >= 0 && snefData !== null
   const isNumbersipproData = sipproData >= 0 && sipproData !== null
   const isNumbermairieData = mairieData >= 0 && mairieData !== null
   const isNumbersnefData2 = snefData2 >= 0 && snefData2 !== null
   const isNumbersipproData2 = sipproData2 >= 0 && sipproData2 !== null
   const isNumbermairieData2 = mairieData2 >= 0 && mairieData2 !== null
   const isNumbermaintenanceZefilData2 = maintenanceZefilData2 >= 0 && maintenanceZefilData2 !== null

  const generatePDF = () => {
    const element = document.getElementById("table-data"); // Replace 'pdf-content' with the ID of the element containing the content you want to convert to PDF
    const opt = {
      margin: 5,
      filename: "table-document.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "landscape" }, // Set orientation to 'landscape'
    };

    html2pdf().from(element).set(opt).save();
  };

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `allgraphsforpdf`;
    navigate(path);
  };

  return (
    <div className="flex items-center justify-center">
      <button
        className=" absolute top-0 right-0 transform -translate-x-1/2 mt-2 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={generatePDF}
      >
        Generate PDF
      </button>
      <div className="mt-24" id="table-data">
        {startDate ? (
          <div className="flex justify-center flex-col">
            <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780">
              <div className="flex flex-col flex-wrap lg:flex-nowrap justify-center ">
                <div className="dark:text-gray-200  font-semibold text-xl mb-3 ">
                  <h1>Compteurs de pannes Caméras</h1>
                </div>
                <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
                  <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
                    <button
                      type="button"
                      style={{}}
                      className="text-md opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
                    >
                      Nb pannes reportées sur la période
                    </button>
                    {isNumbertotalData2 ? (
                      <p className="mt-3">
                        <span className=" flex justify-center text-xl font-bold">
                          {totalData2.toString()}
                        </span>
                      </p>
                    ) : (
                      <img
                        className="flex justify-center ml-20 "
                        style={{ height: "25px" }}
                        src={loader}
                        alt="loader"
                      />
                    )}
                  </div>
                  <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
                    <button
                      type="button"
                      style={{}}
                      className="text-md opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
                    >
                      Nb pannes résolues sur la période
                    </button>
                    {isNumbercompleteData2 ? (
                      <p className="mt-3">
                        <span className=" flex justify-center text-xl font-bold">
                          {completeData2.toString()}
                        </span>
                      </p>
                    ) : (
                      <img
                        className="flex justify-center ml-20 "
                        style={{ height: "25px" }}
                        src={loader}
                        alt="loader"
                      />
                    )}
                  </div>
                  <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
                    <button
                      type="button"
                      style={{}}
                      className="text-lg opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
                    >
                      Nb pannes actives
                    </button>
                    {isNumberremainingData2 ? (
                      <p className="mt-3">
                        <span className=" flex justify-center text-xl font-bold">
                          {remainingData2.toString()}
                        </span>
                      </p>
                    ) : (
                      <img
                        className="flex justify-center ml-20 "
                        style={{ height: "25px" }}
                        src={loader}
                        alt="loader"
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col flex-wrap lg:flex-nowrap justify-center ">
                <div className="dark:text-gray-200 font-semibold text-xl mb-3 ">
                  <h1>Distribution pannes Caméras</h1>
                </div>
                <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
                  <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
                    <button
                      type="button"
                      style={{}}
                      className="text-md opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
                    >
                      Nb pannes gérées par SNEF
                    </button>
                    {isNumbersnefData2 ? (
                      <p className="mt-3">
                        <span className=" flex justify-center text-xl font-bold">
                          {snefData2.toString()}
                        </span>
                      </p>
                    ) : (
                      <img
                        className="flex justify-center ml-20 "
                        style={{ height: "25px" }}
                        src={loader}
                        alt="loader"
                      />
                    )}
                  </div>
                  <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
                    <button
                      type="button"
                      style={{}}
                      className="text-md opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
                    >
                      Nb pannes gérées par SIPPRO
                    </button>
                    {isNumbersipproData2 ? (
                      <p className="mt-3">
                        <span className=" flex justify-center text-xl font-bold">
                          {sipproData2.toString()}
                        </span>
                      </p>
                    ) : (
                      <img
                        className="flex justify-center ml-20 "
                        style={{ height: "25px" }}
                        src={loader}
                        alt="loader"
                      />
                    )}
                  </div>
                  <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
                    <button
                      type="button"
                      style={{}}
                      className="text-md opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
                    >
                      Nb pannes gérées par MAIRIE
                    </button>
                    {isNumbermairieData2 ? (
                      <p className="mt-3">
                        <span className=" flex justify-center text-xl font-bold">
                          {mairieData2.toString()}
                        </span>
                      </p>
                    ) : (
                      <img
                        className="flex justify-center ml-20 "
                        style={{ height: "25px" }}
                        src={loader}
                        alt="loader"
                      />
                    )}
                  </div>
                  <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
                    <button
                      type="button"
                      style={{}}
                      className="text-md opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
                    >
                      Nb pannes gérées par Maintenance Zefil
                    </button>
                    {isNumbermaintenanceZefilData2 ? (
                      <p className="mt-3">
                        <span className=" flex justify-center text-xl font-bold">
                          {maintenanceZefilData2.toString()}
                        </span>
                      </p>
                    ) : (
                      <img
                        className="flex justify-center ml-20 "
                        style={{ height: "25px" }}
                        src={loader}
                        alt="loader"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780">
              <div className="flex flex-col flex-wrap lg:flex-nowrap justify-center ">
                <div className="dark:text-gray-200  font-semibold text-xl mb-3 ">
                  <h1>Compteurs de pannes équipements </h1>
                </div>
                <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
                  <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
                    <button
                      type="button"
                      style={{}}
                      className="text-md opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
                    >
                      Nb pannes reportées sur la période
                    </button>
                    {isNumbertotalData ? (
                      <p className="mt-3">
                        <span className=" flex justify-center text-xl font-bold">
                          {totalData.toString()}
                        </span>
                      </p>
                    ) : (
                      <img
                        className="flex justify-center ml-20 "
                        style={{ height: "25px" }}
                        src={loader}
                        alt="loader"
                      />
                    )}
                  </div>
                  <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
                    <button
                      type="button"
                      style={{}}
                      className="text-md opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
                    >
                      Nb pannes résolues sur la période
                    </button>
                    {isNumbercompleteData ? (
                      <p className="mt-3">
                        <span className=" flex justify-center text-xl font-bold">
                          {completeData.toString()}
                        </span>
                      </p>
                    ) : (
                      <img
                        className="flex justify-center ml-20 "
                        style={{ height: "25px" }}
                        src={loader}
                        alt="loader"
                      />
                    )}
                  </div>
                  <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
                    <button
                      type="button"
                      style={{}}
                      className="text-lg opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
                    >
                      Nb pannes actives
                    </button>
                    {isNumberremainingData ? (
                      <p className="mt-3">
                        <span className=" flex justify-center text-xl font-bold">
                          {remainingData.toString()}
                        </span>
                      </p>
                    ) : (
                      <img
                        className="flex justify-center ml-20 "
                        style={{ height: "25px" }}
                        src={loader}
                        alt="loader"
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col flex-wrap lg:flex-nowrap justify-center ">
                <div className="dark:text-gray-200 font-semibold text-xl mb-3 ">
                  <h1>Distribution pannes équipements </h1>
                </div>
                <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
                  <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
                    <button
                      type="button"
                      style={{}}
                      className="text-md opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
                    >
                      Nb pannes gérées par SNEF
                    </button>
                    {isNumbersnefData ? (
                      <p className="mt-3">
                        <span className=" flex justify-center text-xl font-bold">
                          {snefData.toString()}
                        </span>
                      </p>
                    ) : (
                      <img
                        className="flex justify-center ml-20 "
                        style={{ height: "25px" }}
                        src={loader}
                        alt="loader"
                      />
                    )}
                  </div>
                  <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
                    <button
                      type="button"
                      style={{}}
                      className="text-md opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
                    >
                      Nb pannes gérées par SIPPRO {sipproData}
                    </button>
                    {isNumbersipproData ? (
                      <p className="mt-3">
                        <span className=" flex justify-center text-xl font-bold">
                          {sipproData.toString()}
                        </span>
                      </p>
                    ) : (
                      <img
                        className="flex justify-center ml-20 "
                        style={{ height: "25px" }}
                        src={loader}
                        alt="loader"
                      />
                    )}
                  </div>
                  <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
                    <button
                      type="button"
                      style={{}}
                      className="text-md opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
                    >
                      Nb pannes gérées par MAIRIE
                    </button>
                    {isNumbermairieData ? (
                      <p className="mt-3">
                        <span className=" flex justify-center text-xl font-bold">
                          {mairieData.toString()}
                        </span>
                      </p>
                    ) : (
                      <img
                        className="flex justify-center ml-20 "
                        style={{ height: "25px" }}
                        src={loader}
                        alt="loader"
                      />
                    )}
                  </div>
                  <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
                    <button
                      type="button"
                      style={{}}
                      className="text-md opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
                    >
                      Nb pannes gérées par Maintenance Zefil
                    </button>
                    {isNumbermaintenanceZefilData ? (
                      <p className="mt-3">
                        <span className=" flex justify-center text-xl font-bold">
                          {maintenanceZefilData.toString()}
                        </span>
                      </p>
                    ) : (
                      <img
                        className="flex justify-center ml-20 "
                        style={{ height: "25px" }}
                        src={loader}
                        alt="loader"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="dark:text-gray-200  font-semibold text-xl mb-3 text-center ">
            <h1 className="text-3xl">
              veuillez rentrer une date de début et une date de fin puis générer
              les rapports
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ecommerce;
