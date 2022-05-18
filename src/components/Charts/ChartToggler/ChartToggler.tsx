import React, { useEffect, useState } from 'react';

import { todoType } from '../../../types';
import { SingleFrameAnalysis } from '../../UploadVideo/types';
import BarChart from '../BarChart/BarChart';
import { colors } from '../../../colors';
import LineChart from '../LineChart/LineChart';
import './chartToggler.css';
import {getImportantFrames, parseChartData} from  '../utils';
import { BarDataset, LineDataset } from '../../../interfaces';
import { ATTENTION, MOOD } from '../../../constants';

type ChartTogglerProps = {
  isThumbnail?: boolean,
  isBarChartOnInit: boolean,
  type: string,
  color?: string,
  data: SingleFrameAnalysis[],
  accuracy: number,
  dataType: string
}

const ChartToggler = ({ isThumbnail, isBarChartOnInit, type, color = colors.primaryGreen, data, accuracy, dataType }: ChartTogglerProps) => { // TODO has to take data and parse it here

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
    <div className={isThumbnail ? 'mt-3' : ''} style={{position: 'relative', height: '100%'}}>
      <div className={`row d-flex justify-content-between  ${isThumbnail ? 'me-3' : 'ms-6 me-6'}`}>
        {isThumbnail ? <h4 className='chart-title text-left col-lg-7 mb-0'>{type}</h4> : <h1 className='chart-title text-center col-md-4 mb-0' style={{ margin: 'unset' }}>{type}</h1>}
        <div className={'toggle-btn-group col-md-5 d-flex flex-column justify-content-start'}>
          {isThumbnail ? <></> : <p className='text-nowrap mb-2 chart-type-text' >Chart type</p>}
          <div className="btn-group d-flex mr-2" style={{ zIndex: 1 }}>
            <button className={`p-1 py-2 mb-0 btn btn-primary shadow-none ${isBarChart ? 'selected' : 'not-selected'}`} onClick={togglePrimaryChartType} type="button" style={{background: color}}>Bars</button>
            <button className={`p-1 py-2 mb-0 btn btn-primary shadow-none ${isBarChart ? 'not-selected' : 'selected'}`} onClick={togglePrimaryChartType} type="button" style={{background: color}}>Lines</button>
          </div>
        </div>
      </div>
      {isBarChart && <BarChart
        frames={getImportantFrames(data)}
        accuracy={accuracy}
        isMultibar={false}
        dataset={parseChartData(data, dataType, accuracy, 'bar') as BarDataset}
        color={color}
        isThumbnail={isThumbnail}
        yAxisName={type === ATTENTION || type === MOOD ? `${type} index` : type}
      />}
      {!isBarChart && <LineChart
        frames={getImportantFrames(data)}
        accuracy={accuracy}
        isMultiline={false}
        dataset={[{
          ...parseChartData(data, dataType, accuracy, 'line') as LineDataset,
          id: type,
          color
        }]}
        yAxisName={type === ATTENTION || type === MOOD ? `${type} index` : type}
        title={type}
        isThumbnail={isThumbnail}
      />}
    </div>
  );
};

export default ChartToggler;
