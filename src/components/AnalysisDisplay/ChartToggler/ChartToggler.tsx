import React, { useEffect, useState } from 'react';
import { createMultiBarData, createSingleBarData, createSingleLineData } from '../../../assets/mockDataProvider';
import { todoType } from '../../../types';
import BarChart from '../BarChart/BarChart';
import { colors } from '../colors';
import LineChart from '../LineChart/LineChart';
import './chartToggler.css';

type ChartTogglerProps = {
  isBarChartOnInit: boolean,
  type: string,
  isInModal?: boolean,
  color?: string,
}

const ChartToggler = ({ isBarChartOnInit, type, color = colors.primaryGreen, isInModal = false }: ChartTogglerProps) => { // TODO has to take data and parse it here

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
    <div style={{position: 'relative', height: 'calc(100vh - 133px)', marginTop: isInModal ? 0 : 20}}>
      <div style={{ position: 'absolute', top: -15, right: 75 }}>
        <p className='mb-2' style={{textAlign: 'right'}}>Chart type</p>
        <div className="btn-group mr-2" >
          <button className={`btn btn-primary chart-type-btn shadow-none ${isBarChart ? 'selected' : 'not-selected'}`} onClick={togglePrimaryChartType} type="button" style={{background: color}}>Bars</button>
          <button className={`btn btn-primary chart-type-btn shadow-none ${isBarChart ? 'not-selected' : 'selected'}`} onClick={togglePrimaryChartType} type="button" style={{background: color}}>Lines</button>
        </div>
      </div>
      {isBarChart && <BarChart
        isMultibar={false}
        dataset={createSingleBarData()}
        title={type}
        color={color}
      />}
      {!isBarChart && <LineChart
        isMultiline={false}
        dataset={createSingleLineData(color)}
        yAxisName={`${type} index`}
        title={type}
      />}
    </div>
  );
};

export default ChartToggler;
