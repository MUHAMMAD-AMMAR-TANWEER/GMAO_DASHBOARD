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
  BarSeries,
} from '@syncfusion/ej2-react-charts';
import { useStateContext, StateContext } from '../../contexts/ContextProvider';
import loader from '../../images/loader1.jpg';
import { ChartsHeader, Stacked as StackedChart } from '../../components';

// const BarData = async (startDate, endDate) => {
//   const response = await axios.get(
//     `http://localhost:8000/displaysensorFailure?startDate=${startDate}&endDate=${endDate}`
//   );
//   return response.data.values;
// };

const Stacked = () => {
  const { horizontalbar2 } = useContext(StateContext);
  const [barData, setBarData] = useState();

  useEffect(() => {
    if (horizontalbar2) {
      setBarData(horizontalbar2);      
    }
  }, [horizontalbar2]);

  return (
    <div>
      <div className='w-full'>
        <StackedChart />
      </div>
      <div className='m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl'>
        <ChartsHeader
          category='Distibution des Pannes cameras Declarees par type'
          title='Olympic Medal Counts - RIO'
        />
        <div className=' w-full'>
          {barData ? (
            <ChartComponent
              primaryXAxis={{
                valueType: 'Category',
                title: '',
              }}
              primaryYAxis={{
                title: '',
              }}
            >
              <Inject services={[BarSeries, Category, DataLabel]} />
              <SeriesCollectionDirective>
                <SeriesDirective
                  dataSource={barData}
                  xName='x'
                  yName='y'
                  type='Bar'
                  marker={{ dataLabel: { visible: true } }}
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

export default Stacked;
