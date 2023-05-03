
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

import { barPrimaryXAxis } from '../../data/dummy';
import { ChartsHeader } from '../../components';
import { useStateContext, StateContext } from '../../contexts/ContextProvider';
import loader from '../../images/loader1.jpg';

const Bar2 = () => {
  const { bar2, avg2 } = useContext(StateContext);
  const { currentMode } = useStateContext();
  const [barData, setBarData] = useState();

  const marker = {
    visible: true,
    position: 'Top',
    font: { fontWeight: '600', color: '#ffffff' },
  };

  useEffect(() => {
    if (bar2) {
      setBarData(bar2);      
    }
  }, [bar2]);

  return (
    <div>
      <div className='m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl'>
        <ChartsHeader
          category='Temps moyen de prise en compte ( Sensor )'
          title={`Moyyene : ${avg2}`}
        />
        <div className=' w-full'>
          {barData ? (
            <ChartComponent
              primaryXAxis={barPrimaryXAxis}
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

export default Bar2;
