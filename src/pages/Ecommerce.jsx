import React, { useState } from "react";
import { GoPrimitiveDot } from "react-icons/go";
import { IoIosMore } from "react-icons/io";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";

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
  const { completeData, remainingData, totalData, completeData2, remainingData2, totalData2,snefData, sipproData, mairieData, snefData2, sipproData2, mairieData2 , startDate, endDate} = useContext(StateContext);

  return (
    <div className="mt-24">
      {startDate ? (<div className="flex justify-center flex-col">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780">
          <div className="flex flex-col flex-wrap lg:flex-nowrap justify-center ">
            <div className="dark:text-gray-200  font-semibold text-xl mb-3 ">
              <h1>Compteurs de pannes  Caméras</h1>
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
                {totalData2 ? (
                  <p className="mt-3">
                    <span className=" flex justify-center text-xl font-bold">
                      {totalData2}
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
                {completeData2 ? (
                  <p className="mt-3">
                    <span className=" flex justify-center text-xl font-bold">
                      {completeData2}
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
                {remainingData2 ? (
                  <p className="mt-3">
                    <span className=" flex justify-center text-xl font-bold">
                      {remainingData2}
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
                {snefData2 ? (
                  <p className="mt-3">
                    <span className=" flex justify-center text-xl font-bold">
                      {snefData2}
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
                {sipproData2 ? (
                  <p className="mt-3">
                    <span className=" flex justify-center text-xl font-bold">
                      {sipproData2}
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
                {mairieData2 ? (
                  <p className="mt-3">
                    <span className=" flex justify-center text-xl font-bold">
                      {mairieData2}
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
                {totalData ? (
                  <p className="mt-3">
                    <span className=" flex justify-center text-xl font-bold">
                      {totalData}
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
                {completeData ? (
                  <p className="mt-3">
                    <span className=" flex justify-center text-xl font-bold">
                      {completeData}
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
                {remainingData ? (
                  <p className="mt-3">
                    <span className=" flex justify-center text-xl font-bold">
                      {remainingData}
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
                {snefData ? (
                  <p className="mt-3">
                    <span className=" flex justify-center text-xl font-bold">
                      {snefData}
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
                {sipproData ? (
                  <p className="mt-3">
                    <span className=" flex justify-center text-xl font-bold">
                      {sipproData}
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
                {mairieData ? (
                  <p className="mt-3">
                    <span className=" flex justify-center text-xl font-bold">
                      {mairieData}
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
      </div>) : (<div className="dark:text-gray-200  font-semibold text-xl mb-3 text-center ">
              <h1 className="text-3xl">veuillez rentrer une date de début et une date de fin puis générer les rapports</h1>
            </div>)}
      
    </div>
  );
};

export default Ecommerce;
