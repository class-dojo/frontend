import React from 'react';
import { createMultiBarData, createMultiLineData, createSingleBarData, createSingleLineData, mockRadarData } from '../../assets/mockDataProvider';
import BarChart from './BarChart/BarChart';
import LineChart from './LineChart/LineChart';
import RadarChart from './RadarChart/RadarChart';

const AnalysisDisplay = () => {
  return (
    <div>
      <BarChart
        isMultibar={false}
        dataset={createSingleBarData()}
        title={'Attention index'}
      />
      <BarChart
        isMultibar={true}
        dataset={createMultiBarData()}
        title={'Emotion indexes'}
      />
      <LineChart
        isMultiline={false}
        dataset={createSingleLineData()}
        title={'Attention index'}
      />
      <LineChart
        isMultiline={true}
        dataset={createMultiLineData()}
        title={'Emotion indexes'}
      />
      <RadarChart
        data={mockRadarData}
        title={'Average emotions'}
      />
    </div>
  );
};

export default AnalysisDisplay;
