import React from 'react';
import { createMultiBarData, createMultiLineData, createSingleBarData, createSingleLineData, mockRadarData } from '../../assets/mockDataProvider';
import BarChart from './BarChart/BarChart';
import { colors } from './colors';
import LineChart from './LineChart/LineChart';
import MixedChart from './MixedChart/MixedChart';
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
        dataset={createSingleLineData(colors.primary)}
        title={'Attention index'}
        isOverlayed={false}
      />
      <LineChart
        isMultiline={true}
        dataset={createMultiLineData()}
        title={'Emotion indexes'}
        isOverlayed={false}
      />
      <RadarChart
        data={mockRadarData}
        title={'Average emotions'}
      />
      <MixedChart/>
    </div>
  );
};

export default AnalysisDisplay;
