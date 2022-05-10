import React from 'react';
import { createMultiLineData, createSingleLineData, mockRadarData } from '../../assets/mockDataProvider';
import BarChart from './BarChart/BarChart';
import LineChart from './LineChart/LineChart';
import RadarChart from './RadarChart/RadarChart';

const AnalysisDisplay = () => {
  return (
    <div>
      <BarChart/>
      <LineChart
        isMultiline={false}
        data={createSingleLineData()}
        title={'Attention index'}
      />
      <LineChart
        isMultiline={true}
        data={createMultiLineData()}
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
