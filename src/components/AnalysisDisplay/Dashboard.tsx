import React from 'react';

import './dashboard.css';
import MixedChart from './MixedChart/MixedChart';
import { colors } from './colors';
import AverageValueDisplay from './AverageValueDisplay/AverageValueDisplay';
import { AGGREGATE, ATTENTION, MOOD } from './constants';
import ChartToggler from './ChartToggler/ChartToggler';

const Dashboard = () => {
  return (
    <div className='container-fluid px-4 mt-3 '>  {/* FLUID? */}
      <div className='row d-flex' style={{ height: 'calc(50vh - 50px)', maxHeight: 500 }}>
        <div className='d-flex flex-column align-items-center pt-6 col-sm-4 col-md-3 col-lg-2' >
          <div className='card p-3 py-4 mt-1'>
            <h4 className='text-center '>Average<br/>attention</h4>
            <AverageValueDisplay
              percentage={Math.floor(Math.random() * 101)}
            />
          </div>
        </div>
        <div className='col-sm-8 col-md-9 col-lg-10'>
          <div className='card chart-small'>
            <MixedChart
              isThumbnail={true}
              color={colors.primaryDarkBlue}
              type={AGGREGATE}
            />
          </div>
        </div>
      </div>
      <div className='row' style={{ height: 'calc(50vh - 50px)', maxHeight: 500 }}>
        <div className='d-flex flex-column align-items-center col-sm-4 col-md-2 col-lg-2 pb-6'>
          <div className='card p-3' >
            <h4 className='text-center'>Average<br/>mood</h4>
            <AverageValueDisplay
              percentage={Math.floor(Math.random() * 101)}
            />
          </div>
        </div>
        <div className='col-sm-4 col-md-5 col-lg-5'>
          <div className='card chart-small'>
            <ChartToggler
              isBarChartOnInit={true}
              type={ATTENTION}
              color={colors.primaryRed}
              isThumbnail={true}
            />
          </div>
        </div>
        <div className='col-sm-4 col-md-5 col-lg-5'>
          <div className='card chart-small'>
            <ChartToggler
              isBarChartOnInit={false}
              type={MOOD}
              color={colors.primaryGreen}
              isThumbnail={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
