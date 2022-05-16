import React, { useEffect, useState } from 'react';
import { todoType } from '../../../types';
import { SingleFrameAnalysis } from '../../UploadVideo/types';
import BarChart from '../BarChart/BarChart';
import { ATTENTION, HEADCOUNT, MOOD } from '../../../constants';
import { BarDataset, LineDataset } from '../../../interfaces';
import LineChart from '../LineChart/LineChart';
import { getImportantFrames, parseChartData } from '../utils';
import './mixedChart.css';
import { colors } from '../../../colors';

type MixedChartProps = {
  isThumbnail?: boolean,
  color: string,
  type: string,
  accuracy: number,
  data: SingleFrameAnalysis[]
}

const MixedChart = ({ isThumbnail, color, type, accuracy, data }: MixedChartProps) => {

  const [isBarPrimary, setIsBarPrimary] = useState(true);
  const [isMultiPrimary, setIsMultiPrimary] = useState(true);
  const [lineData, setLineData] = useState(getMultiLineData());
  const [barData, setBarData] = useState(parseChartData(data, 'amountOfPeople', accuracy, 'bar') as BarDataset);
  const [isRedrawing, setIsRedrawing] = useState(false);

  useEffect(() => {
    setIsRedrawing(true);
    if (isMultiPrimary === isBarPrimary) {
      setLineData([{
        ...parseChartData(data, 'amountOfPeople', accuracy, 'line') as LineDataset,
        id: 'Headcount',
        color: isMultiPrimary ? colors.primaryDarkBlueTransparent : colors.primaryDarkBlue,
      }]);
      const multibarData = getMultiBarData();
      setBarData(multibarData);
    } else {
      const multiLineData = getMultiLineData();
      setLineData(multiLineData);
      const singleBarData = parseChartData(data, 'amountOfPeople', accuracy, 'bar') as BarDataset;
      setBarData(singleBarData);
    }
    setIsRedrawing(false);
  }, [isMultiPrimary, isBarPrimary]);

  function getMultiLineData () {
    return [{
      ...parseChartData(data, 'attentionScore', accuracy, 'line') as LineDataset,
      id: ATTENTION,
      color: isBarPrimary ? colors.primaryRedTransparent : colors.primaryRedStrong,
    },
    {
      ...parseChartData(data,'moodScore', accuracy, 'line') as LineDataset,
      id: MOOD,
      color: isBarPrimary ? colors.primaryGreenTransparent : colors.primaryGreenStrong,
    }];
  }

  function getMultiBarData () {
    const data1 = parseChartData(data, 'attentionScore', accuracy, 'bar') as BarDataset;
    const data2 = parseChartData(data, 'moodScore', accuracy, 'bar') as BarDataset;
    const keys = ['Attention', 'Mood'];
    const importantIndexes = [...data1.importantIndexes, ...data2.importantIndexes]; // TODO filter repeated

    const combinedData = [];
    for (let i = 0; i < data1.data.length; i++) {
      combinedData.push(Object.assign({}, data1.data[i], data2.data[i]));
    }
    return {
      data: combinedData,
      keys,
      importantIndexes,
    };
  }

  const togglePrimaryChartType = (event: todoType) => {
    if (!event.target.className.split(' ').includes('selected')) {
      setIsBarPrimary(!isBarPrimary);
    }
  };

  const toggleMainChart = (event: todoType) => {
    if (!event.target.className.split(' ').includes('selected')) {
      setIsMultiPrimary(!isMultiPrimary);
    }
  };

  return (
    <div style={{position: 'relative', height: '100%'}}>
      <div className={`row d-flex justify-content-between ${isThumbnail ? 'ms-5 me-5 mt-3' : 'ms-6 me-6'}` }>
        <div className={`toggle-btn-group col-md-3 ${isThumbnail ? 'thumbnail-toggle-btn-group-margins' : ''}` }>
          {isThumbnail ? <></> : <p className='text-nowrap mb-2'>Select primary chart</p>}
          <div className="btn-group d-flex mr-2 " style={{ zIndex: 1 }}>
            <button className={`btn p-1 py-2 mb-0 btn-primary shadow-none ${isMultiPrimary ? 'selected' : 'not-selected'}`} onClick={toggleMainChart} type="button" style={{flex: '1 1 50%', background: color}}>Indexes</button>
            <button className={`btn p-1 py-2 mb-0 btn-primary shadow-none ${isMultiPrimary ? 'not-selected' : 'selected'}`} onClick={toggleMainChart} type="button" style={{flex: '1 1 50%', background: color}}>Headcount</button>
          </div>
        </div>
        {isThumbnail ? <h4 className='chart-title text-center col-md-4 mb-0'>{type}</h4> : <h1 className='chart-title text-center col-md-4 mb-0' style={{ margin: 'unset' }}>{type}</h1>}
        <div className={'toggle-btn-group col-md-3 d-flex flex-column justify-content-start'}>
          {isThumbnail ? <></> : <p className='text-nowrap mb-2 chart-type-text' >Primary chart type</p>}
          <div className="btn-group d-flex mr-2" style={{ zIndex: 1 }}>
            <button className={`p-1 py-2 mb-0 btn btn-primary shadow-none ${isBarPrimary ? 'selected' : 'not-selected'} `} onClick={togglePrimaryChartType} type="button" style={{background: color}}>Bars</button>
            <button className={`p-1 py-2 mb-0 btn btn-primary shadow-none ${isBarPrimary ? 'not-selected' : 'selected'} `} onClick={togglePrimaryChartType} type="button" style={{background: color}}>Lines</button>
          </div>
        </div>
      </div>
      {!isRedrawing && <div style={{ position: 'relative',  height: '100%' }}>
        <div style={{position: 'absolute', width: '100%', height: '100%' }} >
          <BarChart
            frames={getImportantFrames(data)}
            isMultibar={isMultiPrimary === isBarPrimary}
            accuracy={accuracy}
            dataset={barData}
            isOverlayed={true}
            isSecondary={!isBarPrimary}
            isThumbnail={isThumbnail}
            color={isMultiPrimary === isBarPrimary ? undefined : color}
            yAxisName={isMultiPrimary === isBarPrimary ? 'Attention and Mood indexes' : HEADCOUNT }
          />
        </div>
        <div style={{position: 'relative', height: '100%', width: '100%', pointerEvents: isBarPrimary ? 'none' : 'auto' }} >
          <LineChart
            frames={getImportantFrames(data)}
            accuracy={accuracy}
            isMultiline={isMultiPrimary != isBarPrimary}
            title={'Aggregate'}
            dataset={lineData}
            yAxisName={isMultiPrimary === isBarPrimary ? HEADCOUNT : 'Attention and Mood indexes'}
            isOverlayed={true}
            isSecondary={isBarPrimary}
            isThumbnail={isThumbnail}
          />
        </div>
      </div>}
    </div>
  );
};

export default MixedChart;
