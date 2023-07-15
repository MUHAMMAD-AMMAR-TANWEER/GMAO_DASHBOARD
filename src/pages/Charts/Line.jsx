import React, { useEffect, useState } from 'react';
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
} from '@syncfusion/ej2-react-charts';

import { LinePrimaryXAxis, LinePrimaryYAxis } from '../../data/dummy';
import { useStateContext, StateContext } from '../../contexts/ContextProvider';
import { ChartsHeader, LineChart } from '../../components';
import loader from '../../images/loader1.jpg';
import { useContext } from 'react';
import html2pdf from 'html2pdf.js';


const Line = () => {
  const { line } = useContext(StateContext);
  const { currentMode } = useStateContext();
  const [lineData, setLineData] = useState();

  const marker = { visible: true, width: 10, height: 10 };
  const palette = ['#33FF3F', '#FC3434'];

  useEffect(() => {
    if (line) {
      setLineData(line);      
    }
  }, [line]);

  const generatePDF = () => {
  const element = document.getElementById('line-chart'); // Replace 'pdf-content' with the ID of the element containing the content you want to convert to PDF
  const opt = {
    margin: 10,
    filename: 'converted-document.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }, // Set orientation to 'landscape'
  };

  html2pdf().from(element).set(opt).save();
};

  return (
    <div >
    <button className=" absolute top-0 left-1/2 transform -translate-x-1/2 mt-2 bg-blue-500 text-white px-4 py-2 rounded" onClick={generatePDF}>Generate PDF</button>
    <div id='line-chart'>
      <div className='m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl'>
        <ChartsHeader
          category='Distribution du nombre de pannes caméras sur la période’'
          title=''
        />
        <div className='w-full'>
          <LineChart />
        </div>
      </div>
      <div className='m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl'>
        <ChartsHeader
          category='Distribution du nombre de pannes equipment sur la période’'
          title=''
        />
        <div className='w-full'>
          <div>
            {lineData ? (
              <ChartComponent
                height='420px'
                primaryXAxis={LinePrimaryXAxis}
                primaryYAxis={LinePrimaryYAxis}
                palettes={palette}
                chartArea={{ border: { width: 0 } }}
                tooltip={{ enable: true }}
                background={currentMode === 'Dark' ? '#33373E' : '#fff'}
                legendSettings={{ background: 'white' }}
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
              xName='x'
              yName='y'
              type='Line'
              width='2'
              name="tickets luverts"
              marker={marker}
            ></SeriesDirective>
                      <SeriesDirective
              dataSource={lineData[1]}
              xName='x'
              yName='y'
              type='Line'
              width='2'
              name="ticket fermés"
              marker={marker}
            ></SeriesDirective>
                </SeriesCollectionDirective>
              </ChartComponent>
            ) : (
              <img style={{ height: '50px' }} src={loader} alt='loader' />
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Line;
