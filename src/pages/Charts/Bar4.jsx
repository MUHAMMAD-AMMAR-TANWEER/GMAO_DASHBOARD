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

const Bar4 = () => {
  const { bar4 ,avg4} = useContext(StateContext);
  const { currentMode } = useStateContext();
  const [barData, setBarData] = useState();

  const marker = {
    visible: true,
    position: 'Top',
    font: { fontWeight: '600', color: '#ffffff' },
  };

  useEffect(() => {
    if (bar4) {
      setBarData(bar4);      
    }
  }, [bar4]);

  return (
    <div>
      <div className='m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl'>
      <div className="items-center justify-center gap-3 mb-16  mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900">
      <img src={logo} style={{height:"75px", width:"95px"}} alt="logo"/>
          </div>
        <ChartsHeader
          category='Temps moyen de prise en compte ( équipements )'
          title={` Moyenne : ${avg4}(h)`}
        />
        <div className=' w-full'>
          {barData ? (
            <ChartComponent
              primaryXAxis={barPrimaryXAxis}
              primaryYAxis={{
  
  stripLines: [{ start: 23, end: 24, color: 'red', visible: true }], title:"Heures"
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

export default Bar4;
