import React from 'react';

import './dashboard.css';
import LineChart from './LineChart/LineChart';
import MixedChart from './MixedChart/MixedChart';
import BarChart from './BarChart/BarChart';
import { createSingleBarData, createSingleLineData } from '../../assets/mockDataProvider';
import { colors } from './colors';
import AverageValueDisplay from './AverageValueDisplay/AverageValueDisplay';

const Dashboard = () => {
  return (
    <div className='container-fluid mt-7 '>  {/* FLUID? */}
      <div className='row' style={{ height: 'calc(50vh - 50px)', maxHeight: 500 }}>
        <div className='d-flex flex-column align-items-center pt-6 col-sm-4 col-md-3 col-lg-2'>
          <h4 className='text-center'>Average attention</h4>
          <AverageValueDisplay
            percentage={Math.floor(Math.random() * 101)}
          />
        </div>
        <div className='col-sm-8 col-md-9 col-lg-10'>
          <h4 className='text-center mb-0'>Aggregate</h4>
          <MixedChart
            isThumbnail={true}
            color={colors.primaryRed}
          />
        </div>
      </div>
      <div className='row' style={{ height: 'calc(50vh - 50px)', maxHeight: 500 }}>
        <div className='d-flex flex-column align-items-center col-sm-4 col-md-3 col-lg-2'>
          <h4 className='pt-6 text-center'>Average mood</h4>
          <AverageValueDisplay
            percentage={Math.floor(Math.random() * 101)}
          />
        </div>
        <div className='col-sm-4 col-md-5 col-lg-5'>
          <h4 className='text-center mb-0'>Interest</h4>
          <BarChart
            isMultibar={false}
            dataset={createSingleBarData()}
            title={'Attention index'}
            isThumbnail={true}
            color={colors.primaryGreen}
          />
        </div>
        <div className='col-sm-4 col-md-4 col-lg-5'>
          <h4 className='text-center mb-0'>Mood</h4>
          <LineChart
            isMultiline={false}
            dataset={createSingleLineData(colors.secondaryBlue)}
            yAxisName='Attention'
            title={'Attention index'}
            isThumbnail={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
