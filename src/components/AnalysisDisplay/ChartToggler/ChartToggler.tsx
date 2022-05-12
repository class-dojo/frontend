import React, { useEffect, useState } from 'react';
import { createMultiBarData, createSingleBarData, createSingleLineData } from '../../../assets/mockDataProvider';
import { todoType } from '../../../types';
import BarChart from '../BarChart/BarChart';
import { colors } from '../colors';
import LineChart from '../LineChart/LineChart';
import './chartToggler.css';

type ChartTogglerProps = {
  isThumbnail?: boolean,
  isBarChartOnInit: boolean,
  type: string,
  color?: string,
}

const ChartToggler = ({ isThumbnail, isBarChartOnInit, type, color = colors.primaryGreen }: ChartTogglerProps) => { // TODO has to take data and parse it here

  const [isBarChart, setIsBarChart] = useState(true);

  useEffect(() => {
    setIsBarChart(isBarChartOnInit);
  }, []);

  const togglePrimaryChartType = (event: todoType) => {
    if (!event.target.className.split(' ').includes('selected')) {
      setIsBarChart(!isBarChart);
    }
  };

  return (
    <div style={{position: 'relative', height: isThumbnail ? 'auto' : 'calc(100vh - 133px)'}}>
      <div className={`row d-flex justify-content-between mt-3 ${isThumbnail ? 'ms-5 me-3' : 'ms-6 me-6'}`}>
        {isThumbnail ? <h4 className='chart-title text-left col-lg-7 mb-0'>{type}</h4> : <h1 className='chart-title text-center col-md-4 mb-0' style={{ margin: 'unset' }}>{type}</h1>}
        <div className={'toggle-btn-group col-md-5 d-flex flex-column justify-content-start'}>
          {isThumbnail ? <></> : <p className='text-nowrap mb-2 chart-type-text' >Chart type</p>}
          <div className="btn-group d-flex mr-2" >
            <button className={`p-1 py-2 mb-0 btn btn-primary shadow-none ${isBarChart ? 'selected' : 'not-selected'}`} onClick={togglePrimaryChartType} type="button" style={{background: color}}>Bars</button>
            <button className={`p-1 py-2 mb-0 btn btn-primary shadow-none ${isBarChart ? 'not-selected' : 'selected'}`} onClick={togglePrimaryChartType} type="button" style={{background: color}}>Lines</button>
          </div>
        </div>
      </div>
      {isBarChart && <BarChart
        isMultibar={false}
        dataset={createSingleBarData()}
        color={color}
        isThumbnail={isThumbnail}
      />}
      {!isBarChart && <LineChart
        isMultiline={false}
        dataset={createSingleLineData(color)}
        yAxisName={`${type} index`}
        title={type}
        isThumbnail={isThumbnail}
      />}
    </div>
  );
};

export default ChartToggler;
