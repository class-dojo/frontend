import React from 'react';

import './dashboard.css';
import LineChart from './LineChart/LineChart';
import MixedChart from './MixedChart/MixedChart';
import BarChart from './BarChart/BarChart';
import { createSingleBarData, createSingleLineData } from '../../assets/mockDataProvider';
import { colors } from './colors';
import AverageValueDisplay from './AverageValueDisplay/AverageValueDisplay';
import { AGGREGATE, ATTENTION, MOOD } from './constants';
import ChartToggler from './ChartToggler/ChartToggler';

const Dashboard = () => {
  return (
    <div className='container-fluid mt-3 '>  {/* FLUID? */}
      <div className='row' style={{ height: 'calc(50vh - 50px)', maxHeight: 500 }}>
        <div className='d-flex flex-column align-items-center pt-6 col-sm-4 col-md-3 col-lg-2'>
          <h4 className='text-center'>Average<br/>attention</h4>
          <AverageValueDisplay
            percentage={Math.floor(Math.random() * 101)}
          />
        </div>
        <div className='col-sm-8 col-md-9 col-lg-10'>
          <MixedChart
            isThumbnail={true}
            color={colors.primaryDarkBlue}
            type={AGGREGATE}
          />
        </div>
      </div>
      <div className='row' style={{ height: 'calc(50vh - 50px)', maxHeight: 500 }}>
        <div className='d-flex flex-column align-items-center col-sm-4 col-md-2 col-lg-2'>
          <h4 className='pt-6 text-center'>Average<br/>mood</h4>
          <AverageValueDisplay
            percentage={Math.floor(Math.random() * 101)}
          />
        </div>
        <div className='col-sm-4 col-md-5 col-lg-5'>
          <ChartToggler
            isBarChartOnInit={true}
            type={ATTENTION}
            color={colors.primaryRed}
            isThumbnail={true}
          />
        </div>
        <div className='col-sm-4 col-md-5 col-lg-5'>
          <ChartToggler
            isBarChartOnInit={false}
            type={MOOD}
            color={colors.primaryGreen}
            isThumbnail={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
