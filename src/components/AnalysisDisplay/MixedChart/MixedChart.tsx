import React, { useState } from 'react';
import { createSingleBarData, createSingleLineData } from '../../../assets/mockDataProvider';
import { todoType } from '../../../types';
import BarChart from '../BarChart/BarChart';
import { colors } from '../colors';
import LineChart from '../LineChart/LineChart';
import './mixedChart.css';

// TODO polish margins for this component

const MixedChart = () => {

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
    <div style={{position: 'relative'}}>
      <div style={{ position: 'absolute', top: 85, left: 75 }}>
        <p className='absolute mb-2'>Select primary chart</p>
        <div className="btn-group mr-2" >
          <button className={`btn btn-primary primary-chart-btn shadow-none ${isAttentionPrimary ? 'selected' : 'not-selected'}`} onClick={toggleMainChart} type="button" style={{background: colors.primary}}>Attention</button>
          <button className={`btn btn-primary primary-chart-btn shadow-none ${isAttentionPrimary ? 'not-selected' : 'selected'}`} onClick={toggleMainChart} type="button" style={{background: colors.primary}}>Mood</button>
        </div>
      </div>
      <div style={{ position: 'absolute', top: 85, right: 75 }}>
        <p className='absolute mb-2'>Primary chart type</p>
        <div className="btn-group mr-2" >
          <button className={`btn btn-primary chart-type-btn shadow-none ${isBarPrimary ? 'selected' : 'not-selected'}`} onClick={togglePrimaryChartType} type="button" style={{background: colors.primary}}>Bars</button>
          <button className={`btn btn-primary chart-type-btn shadow-none ${isBarPrimary ? 'not-selected' : 'selected'}`} onClick={togglePrimaryChartType} type="button" style={{background: colors.primary}}>Lines</button>
        </div>
      </div>
      <div style={{ position: 'absolute', width: '100%' }} >
        <BarChart
          isMultibar={false}
          title={'Combined chart'}
          dataset={createSingleBarData()}
          isSecondary={isBarPrimary ? false : true}
        />
      </div>
      <div style={{ position: 'absolute', width: '100%', pointerEvents: isBarPrimary ? 'none' : 'auto' }} >
        <LineChart
          isMultiline={false}
          dataset={createSingleLineData(isBarPrimary ? colors.disabled : colors.primary)}
          title={'Combined chart'}
          yAxisName={'Mood Index'}
          isOverlayed={true}
          isSecondary={isBarPrimary ? true : false}
        />
      </div>

    </div>
  );
};

export default MixedChart;
