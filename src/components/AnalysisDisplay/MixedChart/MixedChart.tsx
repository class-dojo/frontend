import React from 'react';
import { createSingleBarData, createSingleLineData } from '../../../assets/mockDataProvider';
import BarChart from '../BarChart/BarChart';
import { colors } from '../colors';
import LineChart from '../LineChart/LineChart';

const mainContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '100px 0 33px 0',
  height: 'calc(100vh - 133px)'
};

const MixedChart = () => {
  return (
    <div style={mainContainerStyle}>
      <div style={{ position: 'absolute', width: '95%' }} >
        <LineChart
          isMultiline={false}
          dataset={createSingleLineData(colors.secondary)}
          title={'Attention index'}
          isOverlayed={true}
        />
      </div>
      <div style={{ position: 'absolute', width: '95%', pointerEvents: 'auto' }} >
        <BarChart
          isMultibar={false}
          dataset={createSingleBarData()}
          title={'Attention index'}
        />
      </div>
    </div>
  );
};

export default MixedChart;
