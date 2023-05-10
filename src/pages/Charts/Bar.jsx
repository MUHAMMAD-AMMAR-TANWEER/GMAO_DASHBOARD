import React, { useEffect, useState, useContext } from 'react';
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
import Bar2 from './Bar2';
import Bar3 from './Bar3';
import Bar4 from './Bar4';
import loader from '../../images/loader1.jpg';

const Bar = () => {
  const { bar1, avg1 } = useContext(StateContext);
  const { currentMode } = useStateContext();
  const [barData, setBarData] = useState();
 
  const marker = {
    visible: true,
    position: 'Top',
    font: { fontWeight: '600', color: '#ffffff' },
  };

  useEffect(() => {
    if (bar1) {
      setBarData(bar1);      
    }
  }, [bar1]);

  return (
    <div>
      <div className='m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl'>
        <ChartsHeader
          category=' Distribution du nombre de pannes caméras sur la période'
          title={`Moyenne : ${avg1}(h)`}
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
      <Bar2 />
      <Bar3 />
      <Bar4 />
    </div>
  );
};

export default Bar;
