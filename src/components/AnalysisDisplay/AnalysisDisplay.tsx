import React from 'react';
import { createMultiLineData, createSingleLineData } from '../../assets/mockDataProvider';
import BarChart from './BarChart/BarChart';
import LineChart from './LineChart/LineChart';

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
    </div>
  );
};

export default AnalysisDisplay;
