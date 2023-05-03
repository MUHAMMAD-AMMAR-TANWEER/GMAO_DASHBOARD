import React, { useEffect, useState, useContext } from 'react';
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  LineSeries,
  DateTime,
  DateTimeCategory,
  ColumnSeries,
  Legend,
  Tooltip,
} from '@syncfusion/ej2-react-charts';

import { LinePrimaryXAxis, LinePrimaryYAxis } from '../../data/dummy';
import { useStateContext, StateContext } from '../../contexts/ContextProvider';
import loader from '../../images/loader1.jpg';

const LineChart = () => {
  const { line2 } = useContext(StateContext);
  const { currentMode } = useStateContext();
  const [lineData, setLineData] = useState();

  const marker = { visible: true, width: 10, height: 10 };
  const palette = ['#E94649', '#F6B53F', '#6FAAB0', '#C4C24A'];

  useEffect(() => {
    if (line2) {
      setLineData(line2);      
    }
  }, [line2]);

  return (
    <div>
      {lineData ? (
        <ChartComponent
          id='line-chart'
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
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
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
  );
};

export default LineChart;
