import React, { useContext, useEffect, useState } from 'react';
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

} from '@syncfusion/ej2-react-charts';

import { barPrimaryXAxis, barPrimaryYAxis } from '../../data/dummy';
import { ChartsHeader } from '../../components';
import { useStateContext, StateContext } from '../../contexts/ContextProvider';
import loader from '../../images/loader1.jpg';
import logo from "../../images/Logo_Toulouse.png"

const Bar3 = () => {
  const { bar3, avg3 } = useContext(StateContext);
  const { currentMode } = useStateContext();
  const [barData, setBarData] = useState();
 
  const marker={
    dataLabel: {
        visible: true,
        font: { fontWeight: '800', fontSize: "15px" },
    },
};

  useEffect(() => {
    if (bar3) {
      setBarData(bar3);      
    }
  }, [bar3]);

  return (
    <div>
      <div className='m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl'>
      <div className="items-center justify-center gap-3 mb-16  mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900">
      <img src={logo} style={{height:"75px", width:"95px"}} alt="logo"/>
          </div>
        <ChartsHeader
          category='Temps moyen de resolution ( équipements  )'
          title={` Moyenne : ${avg3}(h)`}
        />
        <div className=' w-full'>
          {barData ? (
            <ChartComponent
              primaryXAxis={barPrimaryXAxis}
              primaryYAxis={{
  
  stripLines: [{ start: 7, end: 8, color: 'red', visible: true }], title:"Heures"
}}
              chartArea={{ border: { width: 0 } }}
              tooltip={{ enable: true }}
              background={currentMode === 'Dark' ? '#33373E' : '#fff'}
              legendSettings={{ background: 'white' }}
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
                  xName='x'
                  yName='y'
                  type='Column'
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
  );
};

export default Bar3;
