import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";
import Table from "./Components/Table";

const App = () => {
  const [apiData, setApiData] = useState([]);
  useEffect(async () => {
    const response = await axios.get(`http://localhost:8443/displayAnomalies`);
    setApiData(response.data);
    console.log(`App : ${response.data}`);
  }, []);
  return (
    <div>
      <div className="container mx-auto">
         <Table data={apiData} /> 
      </div>
    </div>
  );
};
export default App;
