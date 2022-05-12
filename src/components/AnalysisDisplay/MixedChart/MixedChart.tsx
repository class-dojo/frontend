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
  isInModal?: boolean,
  color: string,
}

const MixedChart = ({ isThumbnail, color, isInModal }: MixedChartProps) => {

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
    <div style={{position: 'relative', height: 'calc(100vh - 133px)', marginTop: isInModal ? 0 : 20}}>
      {isThumbnail ? <></> : <div style={{ position: 'absolute', top: 95, left: 75 }}>
        <p className='mb-2'>Select primary chart</p>
        <div className="btn-group mr-2" >
          <button className={`btn btn-primary primary-chart-btn shadow-none ${isAttentionPrimary ? 'selected' : 'not-selected'}`} onClick={toggleMainChart} type="button" style={{background: color}}>Attention</button>
          <button className={`btn btn-primary primary-chart-btn shadow-none ${isAttentionPrimary ? 'not-selected' : 'selected'}`} onClick={toggleMainChart} type="button" style={{background: color}}>Mood</button>
        </div>
      </div>}
      {isThumbnail ? <></> : <div style={{ position: 'absolute', top: 95, right: 75 }}>
        <p className='mb-2' style={{textAlign: 'right'}}>Primary chart type</p>
        <div className="btn-group mr-2" >
          <button className={`btn btn-primary chart-type-btn shadow-none ${isBarPrimary ? 'selected' : 'not-selected'}`} onClick={togglePrimaryChartType} type="button" style={{background: color}}>Bars</button>
          <button className={`btn btn-primary chart-type-btn shadow-none ${isBarPrimary ? 'not-selected' : 'selected'}`} onClick={togglePrimaryChartType} type="button" style={{background: color}}>Lines</button>
        </div>
      </div>}
      <div style={{ position: 'absolute', width: '100%' }} >
        <BarChart
          isMultibar={false}
          title={'Aggregate'}
          dataset={createSingleBarData()}
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
