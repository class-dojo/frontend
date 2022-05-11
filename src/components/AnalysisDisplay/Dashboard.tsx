import React from 'react';

import './dashboard.css';
import LineChart from './LineChart/LineChart';
import MixedChart from './MixedChart/MixedChart';
import BarChart from './BarChart/BarChart';
import { createSingleBarData, createSingleLineData } from '../../assets/mockDataProvider';
import { colors } from './colors';

const Dashboard = () => {
  return (
    // <div style={{  }}>
    //   <MixedChart/>
    // </div>
    <div style={{}}>
      <LineChart
        isMultiline={false}
        dataset={createSingleLineData(colors.terciary)}
        yAxisName='Attention'
        title={'Attention index'}
        isThumbnail={true}
      />
    </div>
  );
};

export default Dashboard;
