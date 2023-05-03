import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";

export const StateContext = createContext();

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

export const ContextProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState("#03C9D7");
  const [currentMode, setCurrentMode] = useState("Light");
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [table, setTable] = useState(null);
  const [table2, setTable2] = useState(null);

  // Bar Data States
  // 1.
  const [bar1, setBar1] = useState(null);
  // 2.
  const [bar2, setBar2] = useState(null);
  // 3.
  const [bar3, setBar3] = useState(null);
  // 4.
  const [bar4, setBar4] = useState(null);
  // ------------------------------
  const [avg1, setAvg1] = useState(null);
  const [avg2, setAvg2] = useState(null);
  const [avg3, setAvg3] = useState(null);
  const [avg4, setAvg4] = useState(null);

  // -------------------------------------------------------------

  // Horizontal Bar States
  // 1.
  const [horizontalbar1, setHorizontalbar1] = useState(null);
  // 2.
  const [horizontalbar2, setHorizontalbar2] = useState(null);

  // -------------------------------------------------------------

  // Line Data States
  // 1.
  const [line, setLine] = useState(null);
  // 2.
  const [line2, setLine2] = useState(null);

  // -------------------------------------------------------------

  // Table Data States
  // 1.
  const [completeData, setCompletedData] = useState(null);
  const [remainingData, setRemainingData] = useState(null);
  const [totalData, setTotalData] = useState(null);
  // 2.
  const [completeData2, setCompletedData2] = useState(null);
  const [remainingData2, setRemainingData2] = useState(null);
  const [totalData2, setTotalData2] = useState(null);

  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem("themeMode", e.target.value);
  };

  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem("colorMode", color);
  };

  const handleClick = (clicked) =>
    setIsClicked({ ...initialState, [clicked]: true });

  const updateDates = (newStartDate, newEndDate) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  const getTableData = async () => {
    const response = await axios.get(
      `http://localhost:8000/displayequipmentTable?startDate=${startDate}&endDate=${endDate}`
    );
    setCompletedData(response.data.completed);
    setRemainingData(response.data.remaining);
    setTotalData(response.data.total);
    return response;
  };

  const getTableData2 = async () => {
    const response = await axios.get(
      `http://localhost:8000/displaysensorTable?startDate=${startDate}&endDate=${endDate}`
    );
    setCompletedData2(response.data.completed);
    setRemainingData2(response.data.remaining);
    setTotalData2(response.data.total);
    return response;
  };

  // Line Chart 1
  const lineData1 = async () => {
    const response = await axios.get(
      `http://localhost:8000/displayequipmentTicketOpen?startDate=${startDate}&endDate=${endDate}`
    );
    return response.data[0], response.data[1];
  };

  // Line Chart 2
  const lineData2 = async () => {
    const response = await axios.get(
      `http://localhost:8000/displaysensorTicketOpen?startDate=${startDate}&endDate=${endDate}`
    );
    return response.data[0], response.data[1];
  };

  // Bar Chart 1
  const BarData1 = async () => {
    const response = await axios.get(
      `http://localhost:8000/displaysensorGraphOne?startDate=${startDate}&endDate=${endDate}`
    );
    setAvg1(parseFloat(response.data.avg).toFixed(2));
    return response.data.values[0];
  };
  // Bar Chart 2
  const BarData2 = async () => {
    const response = await axios.get(
      `http://localhost:8000/displaysensorGraphTwo?startDate=${startDate}&endDate=${endDate}`
    );
    setAvg2(parseFloat(response.data.avg).toFixed(2));
    return response.data.values[0];
  };
  // Bar Chart 3
  const BarData3 = async () => {
    const response = await axios.get(
      `http://localhost:8000/displayequipmentTwo?startDate=${startDate}&endDate=${endDate}`
    );
    setAvg3(parseFloat(response.data.avg).toFixed(2));
    return response.data.values[0];
  };
  // Bar Chart 4
  const BarData4 = async () => {
    const response = await axios.get(
      `http://localhost:8000/displayequipmentTwo?startDate=${startDate}&endDate=${endDate}`
    );
    setAvg4(parseFloat(response.data.avg).toFixed(2));
    return response.data.values[0];
  };
  // Horizontal Chart 1
  const HorizontalData1 = async () => {
    const response = await axios.get(
      `http://localhost:8000/displaysensorFailure?startDate=${startDate}&endDate=${endDate}`
    );
    return response.data.values;
  };
  // Horizontal Chart 2
  const HorizontalData2 = async () => {
    const response = await axios.get(
      `http://localhost:8000/displayequipmentFailure?startDate=${startDate}&endDate=${endDate}`
    );
    console.log("helloApiResponse => ", response);
    return response.data.values;
  };

  useEffect(() => {
    (async () => {
      if (startDate && endDate) {
        console.log("re fetching,,,...")
        const fetchHorizontalData1 = await HorizontalData1();
        setHorizontalbar1(fetchHorizontalData1);
        const fetchHorizontalData2 = await HorizontalData2();
        setHorizontalbar2(fetchHorizontalData2);
        const tableData = await getTableData();
        setTable(tableData);
        const tableData2 = await getTableData2();
        setTable2(tableData2);
        const fetchLineData = await lineData1();
        setLine(fetchLineData);
        const fetchLineData2 = await lineData2(startDate);
        setLine2(fetchLineData2);
        const fetchBarData1 = await BarData1();
        setBar1(fetchBarData1);
        const fetchBarData2 = await BarData2();
        setBar2(fetchBarData2);
        const fetchBarData3 = await BarData3();
        setBar3(fetchBarData3);
        const fetchBarData4 = await BarData4();
        setBar4(fetchBarData4);
        
      }
    })();
  }, [startDate, endDate]);

  return (
    <StateContext.Provider
      value={{
        completeData,
        remainingData,
        totalData,
        completeData2,
        remainingData2,
        totalData2,
        table2,
        table,
        line,
        line2,
        bar1,
        bar2,
        bar3,
        bar4,
        horizontalbar1,
        horizontalbar2,
        avg1,
        avg2,
        avg3,
        avg4,
        startDate,
        endDate,
        updateDates,
        currentColor,
        currentMode,
        activeMenu,
        screenSize,
        setScreenSize,
        handleClick,
        isClicked,
        initialState,
        setIsClicked,
        setActiveMenu,
        setCurrentColor,
        setCurrentMode,
        setMode,
        setColor,
        themeSettings,
        setThemeSettings,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
