import React from "react";
import html2pdf from "html2pdf.js";
import Loader from "../images/loader1.jpg";

const Table = ({ data }) => {
  // Assuming 'data' is an array of objects with 6 properties each

  console.log(`tableData: ${data}`);

  const handleClick = () => {
    window.location.replace("http://sippro-gmao.fr/");
  };

  const generatePDF = () => {
    const element = document.getElementById("vertical-bar-charts"); // Replace 'pdf-content' with the ID of the element containing the content you want to convert to PDF
    const opt = {
      margin: [5, 0, 1, 0],
      filename: `Anomalies.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "landscape" }, // Set orientation to 'landscape'
    };

    html2pdf().from(element).set(opt).save();
  };

  return (
    <div>
      <div>
        <button
          className=" absolute top-0 right-0 transform -translate-x-1/2 mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={generatePDF}
        >
          Générer PDF
        </button>
        <button className=" absolute top-0 right-30 transform -translate-x-1/2 mt-2 bg-blue-500 text-white px-4 py-2 rounded">
          <a
            href="http://sippro-gmao.fr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            GO to GMAO
          </a>
        </button>
      </div>

      <div className="overflow-x-auto" id="vertical-bar-charts">
        <table className="min-w-full divide-y divide-gray-200 mt-12">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Equipement ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ticket ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date of creation
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Number of Occurence
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duration before last failure (Days)
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, index) => (
              <tr key={index}>
                {item.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-6 py-4 whitespace-nowrap">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
