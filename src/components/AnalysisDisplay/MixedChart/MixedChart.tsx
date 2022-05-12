import React, { useState } from 'react';
import { createSingleBarData, createSingleLineData } from '../../../assets/mockDataProvider';
import { todoType } from '../../../types';
import BarChart from '../BarChart/BarChart';
import { colors } from '../colors';
import LineChart from '../LineChart/LineChart';
import './mixedChart.css';

// TODO polish margins for this component

type MixedChartProps = {
  isThumbnail?: boolean,
  color: string,
  type: string,
}

const MixedChart = ({ isThumbnail, color, type }: MixedChartProps) => {

  const [isBarPrimary, setIsBarPrimary] = useState(true);
  const [isAttentionPrimary, setIsAttentionPrimary] = useState(true);

  const togglePrimaryChartType = (event: todoType) => {
    if (!event.target.className.split(' ').includes('selected')) {
      setIsBarPrimary(!isBarPrimary);
    }
  };

  const toggleMainChart = (event: todoType) => {
    if (!event.target.className.split(' ').includes('selected')) {
      setIsAttentionPrimary(!isAttentionPrimary);
    }
  };

  // TODO make buttons responsive
  // TODO create dataset mapper

  const mapBarData = () => {
    if (isAttentionPrimary && isBarPrimary) {
      // attention data
    } else if (!isAttentionPrimary && !isBarPrimary) {
      // attention data
    } else {
      // mood data
    }
  };

  const mapLineData = () => {
    if (isAttentionPrimary && isBarPrimary) {
      // mood data
    } else if (!isAttentionPrimary && !isBarPrimary) {
      // mood data
    } else {
      // attention data
    }
  };

  return (
    <div style={{position: 'relative', height: isThumbnail ? 'auto' : 'calc(100vh - 133px)'}}>
      <div className={`row d-flex justify-content-between mt-3 ${isThumbnail ? 'ms-5 me-5' : 'ms-6 me-6'}` }>
        <div className={`toggle-btn-group col-md-3 ${isThumbnail ? 'thumbnail-toggle-btn-group-margins' : ''}` }>
          {isThumbnail ? <></> : <p className='text-nowrap mb-2'>Select primary chart</p>}
          <div className="btn-group d-flex mr-2 ">
            <button className={`btn p-1 py-2 mb-0 btn-primary shadow-none ${isAttentionPrimary ? 'selected' : 'not-selected'}`} onClick={toggleMainChart} type="button" style={{flex: '1 1 50%', background: color}}>Attention</button>
            <button className={`btn p-1 py-2 mb-0 btn-primary shadow-none ${isAttentionPrimary ? 'not-selected' : 'selected'}`} onClick={toggleMainChart} type="button" style={{flex: '1 1 50%', background: color}}>Mood</button>
          </div>
        </div>
        {isThumbnail ? <h4 className='chart-title text-center col-md-4 mb-0'>{type}</h4> : <h1 className='chart-title text-center col-md-4 mb-0' style={{ margin: 'unset' }}>{type}</h1>}
        <div className={'toggle-btn-group col-md-3 d-flex flex-column justify-content-start'}>
          {isThumbnail ? <></> : <p className='text-nowrap mb-2 chart-type-text' >Primary chart type</p>}
          <div className="btn-group d-flex mr-2" >
            <button className={`p-1 py-2 mb-0 btn btn-primary shadow-none ${isBarPrimary ? 'selected' : 'not-selected'} `} onClick={togglePrimaryChartType} type="button" style={{background: color}}>Bars</button>
            <button className={`p-1 py-2 mb-0 btn btn-primary shadow-none ${isBarPrimary ? 'not-selected' : 'selected'} `} onClick={togglePrimaryChartType} type="button" style={{background: color}}>Lines</button>
          </div>
        </div>
      </div>
      <div style={{ position: 'absolute', width: '100%' }} >
        <BarChart
          isMultibar={false}
          dataset={createSingleBarData()}
          isOverlayed={true}
          isSecondary={!isBarPrimary}
          isThumbnail={isThumbnail}
          color={color}
        />
      </div>
      <div style={{ position: 'absolute', width: '100%', pointerEvents: isBarPrimary ? 'none' : 'auto' }} >
        <LineChart
          isMultiline={false}
          dataset={createSingleLineData(isBarPrimary ? '#b2280185' : '#dd4c0a')}
          title={'Aggregate'}
          yAxisName={'Mood Index'}
          isOverlayed={true}
          isSecondary={isBarPrimary}
          isThumbnail={isThumbnail}
        />
      </div>
    </div>
  );
};

export default MixedChart;
