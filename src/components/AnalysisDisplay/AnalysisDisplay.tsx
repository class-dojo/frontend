import React from 'react';
import { createMultiLineData } from '../../assets/mockDataProvider';
import LineChart from './LineChart/LineChart';

const AnalysisDisplay = () => {
  return (
    <LineChart
      type={'multiline'}
      data={createMultiLineData()}
    />
  );
};

export default AnalysisDisplay;
