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

const Line = () => {
  const { line } = useContext(StateContext);
  const { currentMode } = useStateContext();
  const [lineData, setLineData] = useState();

  const marker = { visible: true, width: 10, height: 10 };
  const palette = ['#E94649', '#F6B53F', '#6FAAB0', '#C4C24A'];

  useEffect(() => {
    if (line) {
      setLineData(line);      
    }
  }, [line]);

  return (
    <div>
      <div className='m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl'>
        <ChartsHeader
          category='Distribution sur 30j du nb pannes ( Sensor )'
          title='Distribution du nombre de pannes caméra sur la période'
        />
        <div className='w-full'>
          <LineChart />
        </div>
      </div>
      <div className='m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl'>
        <ChartsHeader
          category='Distribution sur 30j du nb pannes ( Equipement )'
          title='Distribution du nombre de pannes caméra sur la période'
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
                    dataSource={lineData}
                    xName='x'
                    yName='y'
                    type='Line'
                    width='2'
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
  );
};

export default Line;
