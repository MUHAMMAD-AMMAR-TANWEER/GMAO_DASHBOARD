import React, { useEffect, useState } from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  Category,
  BarSeries,
  DataLabel,
} from "@syncfusion/ej2-react-charts";

import { ChartsHeader } from "..";
import loader from "../../images/loader1.jpg";
import { StateContext } from "../../contexts/ContextProvider";
import { useContext } from "react";
import { SiShopware } from "react-icons/si";

const Bar2 = () => {
  const { horizontalbar1 } = useContext(StateContext);
  const [barData, setBarData] = useState(false);

  useEffect(() => {
    if (horizontalbar1) {
      setBarData(horizontalbar1);
    }
  }, [horizontalbar1]);

  return (
    <div>
      <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
        <div className="items-center justify-center gap-3 mb-16  mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900">
          <SiShopware size={30} /> <span className="text-2xl">GMAO</span>
        </div>
        <ChartsHeader category="Distribution des pannes caméras par type" />
        <div className=" w-full">
          {barData ? (
            <ChartComponent
              primaryXAxis={{
                valueType: "Category",
                title: "",
              }}
              primaryYAxis={{
                title: "",
              }}
            >
              <Inject services={[BarSeries, Category, DataLabel]} />
              <SeriesCollectionDirective>
                <SeriesDirective
                  dataSource={barData}
                  xName="x"
                  yName="y"
                  type="Bar"
                  marker={{ dataLabel: { visible: true } }}
                ></SeriesDirective>
              </SeriesCollectionDirective>
            </ChartComponent>
          ) : (
            <img style={{ height: "50px" }} src={loader} alt="loader" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Bar2;
